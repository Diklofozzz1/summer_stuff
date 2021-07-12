import React from "react";

import MenuAppBar from "../../component/AppBar/AppBar";
import PLayer from "../../component/PLayer/PLayer";
import * as ReactDOM from "react-dom";

const playerContainer = document.getElementById('player')

export default class StreamPage extends React.Component {
    render() {
        return(
            <div>
                <MenuAppBar />
                <PLayer />
            </div>
        )
    }
}