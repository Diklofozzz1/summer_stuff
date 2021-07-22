import React from 'react';
import { Redirect } from 'react-router-dom'
import { Avatar, Typography, Button } from '@material-ui/core';

import { MenuAppBar, StreamNameContext } from '../../component/AppBar/AppBar';
import PLayer from '../../component/PLayer/PLayer';
import Chat from '../../component/Chat/Chat';
import {cookie} from "../../endpoint/cookie";


export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);

        this.setStreamName = (value) => {
            this.setState({
                streamName: value,
            })
        }

        this.state = {
            userName: this.props.match.params.streamer,
            streamName: '',
            setStreamName: this.setStreamName,
            isAuth: cookie.get('isAuth') === 'true',
        }
    }


    render() {
        console.log(`streamPage: ${cookie.get('username')}`);
        console.log(`streamPageAuth: ${cookie.get('isAuth')}`);
        if (!this.state.userName) {
            return <Redirect to='/error?error=404' />
        }

        return (
            <div>
                <StreamNameContext.Provider value = {this.state}>
                    <MenuAppBar parent = {this} />
                    <PLayer />
                    <div style = {{position: 'absolute', right: 0}}>
                        <Chat disabled = {this.state.isAuth === false} />
                    </div>
                    <div style = {{top: '47vw', marginLeft: '1%', position: 'absolute'}}>
                        <div style = {{display: 'inline-block',}}>
                            <Avatar style = {{width: '3vw', height: '3vw'}} />
                        </div>
                        <div style = {{display: 'inline-block', marginLeft: '2vh'}}>
                            <Typography variant = 'h5' style = {{margin: 2}}> {this.state.userName} </Typography>
                            <Typography style = {{margin: 2}}> Now streaming: {this.state.streamName}</Typography>
                        </div>
                        <div style = {{display: 'inline', marginLeft: '2vh'}}>
                            <Button
                                disabled = {this.state.isAuth === false} variant = 'contained' color = 'primary'
                            > Подписаться </Button>
                        </div>
                    </div>
                </StreamNameContext.Provider>
            </div>
        )
    }
}