import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import {cookie} from "../../endpoint/cookie";

import {MenuAppBar, StreamNameContext} from "../../component/AppBar/AppBar";
import PLayer from "../../component/PLayer/PLayer";
import Chat from "../../component/Chat/Chat";



export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);

        this.setStreamName = (value) => {
            this.setState({
                streamName: value,
            })
        }

        this.state = {
            userName: cookie.get('username') || qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).streamer,
            streamName: '',
            setStreamName: this.setStreamName,
            isAuth: true,
        }
    }

    render() {
        return(
            <div>
                <StreamNameContext.Provider value = {this.state}>
                    <MenuAppBar parent={this}/>
                    <PLayer />
                    <div style={{position: "absolute", right: 0}}>
                        <Chat disabled = {this.state.isAuth === false} />
                    </div>
                    <div style={{top: '47vw',  marginLeft: '1%', position: 'absolute'}}>
                        <div style={{display: "inline-block", }}>
                            <Avatar style={{width:'3vw', height: '3vw'}} />
                        </div>
                        <div style={{display: "inline-block", marginLeft: '2vh'}}>
                            <Typography variant="h5"  style={{margin: 2}}> {this.state.userName} </Typography>
                            <Typography style={{margin: 2}}> Now streaming: {this.state.streamName}</Typography>
                        </div>
                        <div style={{display: "inline", marginLeft: '2vh'}}>
                            <Button disabled={this.state.isAuth === false} variant="contained" color="primary"> Подписаться </Button>
                        </div>
                    </div>
                </StreamNameContext.Provider>
            </div>
        )
    }
}