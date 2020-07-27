import React, { Componnet } from 'react';
import { Route, Rediret, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Componnet, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Componnet {...props} />
    ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )} />
)

export default AdminRoute;
