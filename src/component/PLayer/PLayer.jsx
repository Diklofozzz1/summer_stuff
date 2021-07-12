import React from "react";

export default class Player extends React.Component{

    componentWillMount() {
        const jsCode = ``;
        const script = document.createElement("script");
        script.text = "\n      var totalTestSources = [\n    {\n        type: 'webrtc',\n        file:  'ws://90.188.92.68:3333/app/stream',\n        label: '1080',\n        default: 'true'\n    },\n];\n\nvar player = OvenPlayer.create(\"player\", {\n    debug : true,\n    sources: totalTestSources\n});";
        script.onload = () => this.scriptLoaded();

        document.body.appendChild(script);
    }

    render() {
        return(
            <div></div>
        );
    }
}