import React from 'react';
import { Redirect } from 'react-router-dom'
import { Avatar, Typography, Button } from '@material-ui/core';

import { MenuAppBar } from '../../component/AppBar/AppBar';
import PLayer from '../../component/PLayer/PLayer';
import Chat from '../../component/Chat/Chat';
import { cookie } from '../../endpoint/cookie';
import { apiStreamPool, apiSubscribe, apiUnsubscribe, apiUserSubscriptions } from '../../api/api';


export default class StreamPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.match.params.streamer,
            streamName: this.props.streamName,
            isError: false,
            isAuth: cookie.get('isAuth') === 'true',
            streamLinks: [],
            isSubscribed: false
        }
    }

    player = (<div>Плеер не достпуен(</div>);

    componentDidMount() {
        apiStreamPool().then(response => {
            try {
                const data = response.data[this.props.match.params.streamer];

                this.player = <PLayer links = {data[0]} />;

                this.setState({
                    streamName: data[1],
                    streamLinks: data[0]
                });
            } catch(err) {
                this.setState({
                    isError: true
                });
            }
        });

        const currUser = cookie.get('username');
        if( currUser === null || currUser === undefined )
            return;

        if( currUser.length ) {
            apiUserSubscriptions(currUser).then(res => {
                if (!res.data[0].subscribe)
                    return;

                const subscriptions = res.data[0].subscribe;

                for( const user of subscriptions ) {
                    if( user === this.state.userName ) {
                        this.setState({
                            isSubscribed: true
                        });

                        break;
                    }
                }
            }).catch(err => {
                alert('Временные технические шоколадки');
                console.error(err);
            })
        }
    }

    subscribe = () => {
        if( cookie.get('username') === this.state.userName )
            return;

        apiSubscribe(cookie.get('username'), this.state.userName).then(res => {
            if (res.status === 200) {
                this.setState({
                    isSubscribed: true,
                })
            } else if (res.status === 400) {
                alert('Пока что невозможно подписаться от этого пользователя(')
            } else if (res.status === 404) {
                alert('Такого пользователя не существует!');
            }
        }).catch(err => {
            alert('Временные технические шоколадки');
            console.error(err);
        })
    }

    unsubscribe = () => {
        if( cookie.get('username') === this.state.userName )
            return;

        apiUnsubscribe(cookie.get('username'), this.state.userName).then(res => {
            if (res.status === 200) {
                this.setState({
                    isSubscribed: false,
                })
            } else if (res.status === 400) {
                alert('Пока что невозможно отписаться от этого пользователя(')
            } else if (res.status === 404) {
                alert('Такого пользователя не существует!');
            }
        }).catch(err => {
            alert('Временные технические шоколадки');
            console.error(err);
        })
    }

    handlerSubscribeButtonText = () => {
        if (cookie.get('username') === this.state.userName)
            return 'Подписаться на себя?';

        return this.state.isSubscribed ? 'Отписаться' : 'Подписаться';
    }

    render() {
        if( !this.state.userName || this.state.isError ) {
            document.getElementById('player').style.display = 'none';
            return <Redirect to = '/error?error=404' />
        }

        return (
            <div style = {{width: '100%', height: '100%'}}>
                <MenuAppBar parent = {this} />

                {this.player}

                <div style = {{position: 'absolute', right: 0}}>
                    <Chat disabled = {this.state.isAuth === false} streamer = {this.props.match.params.streamer} />
                </div>
                <div style = {{bottom: '1%', marginLeft: '1%', position: 'absolute'}}>
                    <div style = {{display: 'inline-block',}}>
                        <Avatar style = {{width: '3vw', height: '3vw'}} />
                    </div>
                    <div style = {{display: 'inline-block', marginLeft: '2vh'}}>
                        <Typography variant = 'h5' style = {{margin: 2}}> {this.state.userName} </Typography>
                        <Typography style = {{margin: 2}}> Now streaming: {this.state.streamName}</Typography>
                    </div>
                    <div style = {{display: 'inline', marginLeft: '2vh'}}>
                        <Button
                            disabled = {
                                this.state.isAuth === false ||
                                cookie.get('username') === this.state.userName
                            }
                            variant = {this.state.isAuth === false || cookie.get('username') === this.state.userName ? 'contained' : this.state.isSubscribed ? 'outlined' : 'contained'}
                            color = 'primary'
                            onClick = {() => {
                                this.state.isSubscribed ? this.unsubscribe() : this.subscribe()
                            }}
                        >
                            { this.handlerSubscribeButtonText() }
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
