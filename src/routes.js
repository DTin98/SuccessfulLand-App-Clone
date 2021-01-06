import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/author/signin'
import SignUp from './components/author/signup'
import Home from './components/home'
import ReactNotification from 'react-notifications-component'

const Main = () => (
	<>
		<ReactNotification />
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/signup" component={SignUp} />
			</Switch>
		</Router>
	</>
);

export default Main;