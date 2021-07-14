import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MenuAppBar from "../../component/AppBar/AppBar";
import PLayer from "../../component/PLayer/PLayer";
import Chat from "../../component/Chat/Chat";



export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'some name',
            streamName: 'name of stream'
        }
    }
    render() {

        return(
            <div>
                <MenuAppBar />
                <PLayer  />
                <div style={{position: "absolute", right: 0}}>
                    <Chat />
                </div>
                <div style={{top: '47vw',  marginLeft: '1%', position: 'absolute'}}>
                    <div style={{display: "inline-block", }}>
                        <Avatar style={{width:'3vw', height: '3vw'}} />
                    </div>
                    <div style={{display: "inline-block", marginLeft: '2vh'}}>
                        <Typography variant="h5"  style={{margin: 2}}> ssomeName </Typography>
                        <Typography style={{margin: 2}}> Now streaming: ,kz,kz</Typography>
                    </div>
                    <div style={{display: "inline", marginLeft: '2vh'}}>
                        <Button variant="contained" color="primary"> Подписаться </Button>
                    </div>
                </div>
            </div>
        )
    }
}