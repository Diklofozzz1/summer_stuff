import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import StreamPage from './pages/StreamPage/StreamPage'
import ErrorPage from './pages/ErrorPage/ErrorPage';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/stream' component={StreamPage} />
                <Route path='/error' component={ErrorPage} />
                {/*<Route path='/govno' component={StreamPage} />*/}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;