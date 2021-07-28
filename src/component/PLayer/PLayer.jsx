import React from "react";

export default class Player extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            links: []
        }
    }

    componentDidMount() {
        let links = [];

        try {
            if (!this.props.links.length) {
                links = [
                    'ws://90.188.92.68:3333/app/qwerty2_720_60?policy=eyJ1cmxfZXhwaXJlIjo3OTU1MDg5MzQ1MDAwfQ&signature=Npv36RmruxIAmzPyEdjLPKRRph4',
                    'ws://90.188.92.68:3333/app/qwerty2_720_60?policy=eyJ1cmxfZXhwaXJlIjo3OTU1MDg5MzQ1MDAwfQ&signature=Npv36RmruxIAmzPyEdjLPKRRph4',
                    'ws://90.188.92.68:3333/app/qwerty2_720_60?policy=eyJ1cmxfZXhwaXJlIjo3OTU1MDg5MzQ1MDAwfQ&signature=Npv36RmruxIAmzPyEdjLPKRRph4'
                ]
            } else {
                links = this.props.links.replace(/[{}']/g, "").split(',');
            }

            const script = document.createElement("script");
            const hash = Math.floor(Math.random()*100).toString().substring(0,2);
            script.text = `let _streamSourses${hash} = [\n` +
                "            {\n" +
                "                type: 'webrtc',\n" +
                `                file:  '${links[2].replace(' ', '')}',\n` +
                "                label: '1080',\n" +
                "                default: 'true'\n" +
                "            },\n" +
                "            {\n" +
                "                type: 'webrtc',\n" +
                `                file:  '${links[1].replace(' ', '')}',\n` +
                "                label: '720_30'\n" +
                "            },\n" +
                "            {\n" +
                "                type: 'webrtc',\n" +
                `                file:  '${links[0].replace(' ', '')}',\n` +
                "                label: '720_60'\n" +
                "            },\n" +
                "        ];" +
                "           var player = OvenPlayer.create(\"player\", {" +
                "\n                                              debug : true," +
                `\n                                              sources: _streamSourses${hash}\n` +
                "});";

            script.onload = () => this.scriptLoaded();
            document.body.appendChild(script);
            // document.body.append(script);
           // script.remove();
        }catch(_){
            console.error(_);
        }
    }

    render() {
        return(
            <div />
        );
    }
}