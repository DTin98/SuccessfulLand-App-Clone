import React, { useState, useEffect } from 'react'
import './index.css'

export default function ControlBoard(props) {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setDisplay(props.display)
    });

    function turnOff() {
        props.parentCallback("areaDetailOff");
    }

    return (
        <div style={{ display: !display ? 'none' : 'block' }}>
            <button type="button" class="btn btn-default back-button" onClick={turnOff}>
                <i class="fas fa-arrow-left"></i>
            </button>
            <img src="/img/default.svg" style={{ width: '100%' }}></img>
            <div className="d-flex flex-column pl-2 detail-header mb-3 mt-3">
                {!display ?
                    <>
                    </>
                    :
                    <>
                        <h5 style={{ fontWeight: '500' }} >Phường 4</h5>
                        <span>Tân Bình</span>
                        <span>{props.polygonData.properties?.NAME_1}</span>
                    </>
                }
            </div>
            <div className="line"></div>
            <div className="d-flex flex-row mt-5 mb-5" style={{ justifyContent: 'space-around', color: '#2980B9' }}>

                <div className="d-flex flex-column" >
                    <img src="/img/save_btn.svg"></img>
                    <span style={{ color: '#2980B9', fontWeight: 'bold' }}>Lưu</span>
                </div>

                <div className="d-flex flex-column">
                    <img src="/img/comment.svg"></img>
                    <span style={{ color: '#2980B9', fontWeight: 'bold' }}> Đánh giá</span>
                </div>

            </div>
            <div className="line"></div>
            <div>
                <h5>Tiện ích xung quanh</h5>
                <div className="d-flex flex-row utilities" style={{ justifyContent: 'space-around', color: '#FFFFFF' }}>
                    <div>
                        <label class="checkbox-container">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <div className="d-flex flex-column " style={{ textAlign: 'center', width: '100%' }}>
                            <h3>12</h3>
                            <img src="/img/school.svg" alt="" />
                            <span className="pt-2">Trường học</span>
                        </div>
                    </div>
                    <div>
                        <label class="checkbox-container">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <div className="d-flex flex-column" style={{ textAlign: 'center', width: '100%' }}>
                            <h3>24</h3>
                            <img src="/img/restaurant.svg" alt="" />
                            <span className="pt-2">Nhà hàng</span>
                        </div>
                    </div>
                    <div>
                        <label class="checkbox-container">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <div className="d-flex flex-column" style={{ textAlign: 'center', width: '100%' }}>
                            <h3>4</h3>
                            <img src="/img/hospital.svg" alt="" />
                            <span className="pt-2">Bệnh viện</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
