import React, { Componnet } from 'react';
import { Route, Rediret, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ component: Componnet, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() ? (
        <Componnet {...props} />
    ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )} />
)

export default PrivateRoute;
