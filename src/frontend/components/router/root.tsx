import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import MainInformation from '@components/main/MainInformation';
import PageNotFound from '@components/specials/PageNotFound';
import About from '@components/about/about';

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainInformation}/>
                    <Route exact path='/about' component={About}/>
                    <Route component={PageNotFound}/>
            </Switch>
        );
    }
}