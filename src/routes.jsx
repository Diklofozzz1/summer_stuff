import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import StreamPage from './pages/StreamPage/StreamPage'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/stream' component={StreamPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;