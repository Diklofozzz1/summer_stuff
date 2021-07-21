import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import StreamPage from './pages/StreamPage/StreamPage'
import ErrorPage from './pages/ErrorPage/ErrorPage';
import StreamOnline from './pages/StreamOnline/StreamOnline'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/stream/:streamer?' component={StreamPage} />
                <Route path='/error' component={ErrorPage} />
                <Route path='/' component={StreamOnline}/>
                {/*<Route path='/govno' component={StreamPage} />*/}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;