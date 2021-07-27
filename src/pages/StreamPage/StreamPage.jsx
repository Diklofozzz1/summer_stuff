import React from 'react';
import {Redirect} from 'react-router-dom'
import {Avatar, Typography, Button} from '@material-ui/core';

import {MenuAppBar} from '../../component/AppBar/AppBar';
import PLayer from '../../component/PLayer/PLayer';
import Chat from '../../component/Chat/Chat';
import {cookie} from "../../endpoint/cookie";
import {apiStreamPool} from "../../api/api";


export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.match.params.streamer,
            streamName: this.props.streamName,
            isError: false,
            isAuth: cookie.get('isAuth') === 'true',
            streamLinks: []
        }
    }

    player = (<div>Плеер не достпуен(</div>);

    componentDidMount() {
        apiStreamPool().then(response => {
            try {
                const data = response.data[this.props.match.params.streamer];

                this.player = <PLayer links={data[0]}/>;

                this.setState({
                    streamName: data[1],
                    streamLinks: data[0]
                });
            } catch (err) {
                this.setState({
                    isError: true
                });
            }
        })
    }

    render() {
        console.log(this.state.streamLinks);

        if (!this.state.userName || this.state.isError) {
            document.getElementById('player').style.display = 'none';
            return <Redirect to='/error?error=404'/>
        }

        return (
            <div>
                <MenuAppBar parent={this}/>

                { this.player }

                <div style={{position: 'absolute', right: 0}}>
                    <Chat disabled={this.state.isAuth === false} streamer={this.props.match.params.streamer}/>
                </div>
                <div style={{top: '47vw', marginLeft: '1%', position: 'absolute'}}>
                    <div style={{display: 'inline-block',}}>
                        <Avatar style={{width: '3vw', height: '3vw'}}/>
                    </div>
                    <div style={{display: 'inline-block', marginLeft: '2vh'}}>
                        <Typography variant='h5' style={{margin: 2}}> {this.state.userName} </Typography>
                        <Typography style={{margin: 2}}> Now streaming: {this.state.streamName}</Typography>
                    </div>
                    <div style={{display: 'inline', marginLeft: '2vh'}}>
                        <Button
                            disabled={this.state.isAuth === false} variant='contained' color='primary'
                        > Подписаться </Button>
                    </div>
                </div>
            </div>
        )
    }
}