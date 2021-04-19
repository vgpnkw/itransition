import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {Users} from './pages/Users';
import {AuthPage} from './pages/AuthPage';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/users' exact>
                    <Users />
                </Route>
                <Redirect to="/users" />
            </Switch>
        )
    }
    
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}