import restaurant from '../../Restaurant.svg'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import './index.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "leaflet/dist/leaflet.css";
import Header from '../common/header'
import { PixiOverlay } from 'react-leaflet-pixi-overlay';
import * as polygonTinh from '../../data/tinh.json';
import * as polygonQuan from '../../data/quan.json'
import axios from 'axios'
import * as Request from '../../services';
import * as Helper from '../../helper'
import AreaDetail from './area_detail/index'
const _ = require('lodash');


export default function Home() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDisplay, setSearchDisplay] = useState(true)
  const [isZoom, setZoom] = useState(true)

  const [areaDetailDisplay, setAreaDetailDisplay] = useState(false)

  const [polygon, setSearchPolygon] = useState(polygonTinh.features)

  function MoveMap() {
    const map = useMap()
    if (polygon.geometry) {
      var latlngs = [];
      L.geoJSON(polygon, {
        coordsToLatLng: function (coords) {
          latlngs.push([coords[1], coords[0]]);
        },
      });
      const polygonMap = L.polygon(latlngs, {fillColor:'green',opacity:'0.01' }).addTo(map)
      map.fitBounds(polygonMap.getBounds())
    }
    return null
  }

  console.log(isZoom)
  console.log(polygon)

  function GetPolygonByZoom() {
    const map = useMapEvents({
      zoom: async (e) => {
        const zoom = map.getZoom()
          if (zoom >= 11) {
            setSearchPolygon(polygonQuan.features)
          }
          else {
            setSearchPolygon(polygonTinh.features)
          }
        }
    })

    return null
  }


  function GetUtilitiesByMovingMap() {
    const map = useMapEvents({
      dragend: async (e) => {
        console.log(map.getZoom())
        if (map.getZoom() >= 17) {
          const southwest = e.target.getBounds()._southWest;
          const northeast = e.target.getBounds()._northEast;
          const result = await Request.getData(`utilities/getByBorder?category=Nhà hàng&border=${northeast.lat},${northeast.lng},${southwest.lat},${southwest.lng}`)
          if (result.length != 0) {
            window.$(".leaflet-marker-icon").remove();
            let restaurantIcon = L.icon({
              iconUrl: restaurant,
              iconRetinaUrl: restaurant,
              iconAnchor: [5, 55],
              popupAnchor: [10, -44],
              iconSize: [50, 55],
            });
            result.forEach(element => {
              L.marker([element.gps.coordinates[1], element.gps.coordinates[0]], { icon: restaurantIcon }).addTo(map);
            });
          }
        }
        else {
          window.$(".leaflet-marker-icon").remove();
        }
      }
    });
    return null;
  }


  function callbackFunction(childData) {
    if (childData == "areaDetailOff") {
      setAreaDetailDisplay(false)
      setSearchDisplay(true)
      setDisplay(false)
    }
  }

  async function setPolygon(polygonData) {
console.log('data search ', polygonData)
    let result = {}
    switch (polygonData.type) {
      case 1:
        result = await Request.getData(`areas/getBorderByCode?type=1&provinceCode=${polygonData.provinceCode}`);
        break;
      case 2:
        result = await Request.getData(`areas/getBorderByCode?type=2&districtCode=${polygonData.districtCode}&provinceCode=${polygonData.provinceCode}`);
        break;
      case 3:
        result = await Request.getData(`areas/getBorderByCode?type=3&villageCode=${polygonData.villageCode}&districtCode=${polygonData.districtCode}&provinceCode=${polygonData.provinceCode}`);
        break;
    }
    setSearchPolygon(result)
    setSearchDisplay(false)
    setDisplay(false)
    setAreaDetailDisplay(true)
    setZoom(false)
  }

  useEffect(async () => {
    const result = await Request.getData(`areas?_q=${search}`)
    if (!result.length == 0) {
      setDisplay(true)
      setOptions(result)
    }
    else {
      setDisplay(false)
      setOptions([])
    }
  }, [search]);

  const onEachContry = (feature, layer) => {
    const contryName = feature.properties.NAME_1 || '';
    layer.on('mouseover', function (e) {
      layer.bindTooltip(contryName).openTooltip()
      this.setStyle({
        fillColor: 'blue'
      })
    });

    layer.on('mouseout', function (e) {
      layer.bindTooltip(contryName).closeTooltip()
      this.setStyle({
        fillColor: 'false',
        color: 'false'
      })
    });
  }

  const LayerStyle = {
    color: 'false',
    fillColor: 'false'
  }

  return (
    <>
      <Header />
      <MapContainer center={[14.7743, 106.6669]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MoveMap />
        <GetUtilitiesByMovingMap />
        <GetPolygonByZoom />
        <GeoJSON
          key={polygon.length}
          style={LayerStyle}
          data={polygon}
          onEachFeature={onEachContry}
        />
      </MapContainer>
      <button type="button" className="btn btn-demo" data-toggle="modal" data-target="#controlBoard" id="left-sidebar-button" data-backdrop="false" >
        Bảng điều khiển
		</button>
      <div className="modal left fade" data-keyboard="false" data-backdrop="static" id="controlBoard" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" class="btn btn-default close-board" data-dismiss="modal">
                <i class="fas fa-chevron-left"></i>
              </button>
              <AreaDetail
                polygonData={polygon}
                display={areaDetailDisplay}
                parentCallback={callbackFunction}
              />
              <div className="p-2" style={{ background: 'rgba(112, 112, 112, 0.6)', width: '100%', display: !searchDisplay ? 'none' : 'block' }} >
                <div className="search">
                  <input type="text" onChange={event => setSearch(event.target.value)} className="searchTerm" placeholder="Tìm kiếm địa điểm" style={{ width: '100%' }} />
                </div>
              </div>
              {
                display && (
                  <div className="autoContainer p-2 pb-3">
                    {
                      options.map((v, i) => {
                        return <div className="option pt-2 pb-2" onClick={() => setPolygon(v)} key={i}>
                          <img src="/img/Search_history.svg" className="pr-2"></img>
                          <span>{_.truncate(v.fullAddress, {
                            'length': 35
                          })}</span>
                        </div>
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}