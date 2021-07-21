import React, {useEffect, useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import {useStyles} from "./ChatStyle";
import Typography from "@material-ui/core/Typography";

import socket from '../../endpoint/socket';
import {cookie} from "../../endpoint/cookie";

export default function Chat({disabled}) {
    const classes = useStyles();
    const userName = cookie.get('username');

    const [messagesList, addMessage] = useState([]);
    const [messages, saveMessage] = useState('');

    let index = 1;

    try{
        socket.onmessage = e => {
            const data = JSON.parse(e.data);

            addMessage([
                ...messagesList,
                createMessageView(data.username, data.message)
            ]);
        }

        socket.onclose = _ => {
            console.log('Disconnect');
        }
    } catch(_){ }


    const createMessageView = (author, data) => (
        <ListItem style={{padding: 0, paddingLeft: '0.5vw'}} key={index}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText
                        style={{ wordWrap: 'break-word'}}
                        align="left"
                        primary={
                            <div>
                                <span
                                    style={{color: `#${((1<<24)*Math.random() | 0).toString(16)}`}}>
                                    {author}
                                </span>: {data}
                            </div>
                        }
                    />
                </Grid>
            </Grid>
        </ListItem>
    );

    const sandMessage = () => {
        if (!messages.length || !userName.length)
            return;

        try{
            socket.send(JSON.stringify({
                message: messages,
                username: 'admin',
                channel: 1
            }));

            // socket.emit('sendMessage', message);

            addMessage([
                ...messagesList,
                createMessageView(userName, messages)
            ]);
            saveMessage('');
            index++;
        }catch (_){}
    }

    const scrollRef = useRef(null)
    useEffect(()=>{
        if (scrollRef.current){
            scrollRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [messagesList])

        return (

            <div>
                <Grid className={classes.chatSection}>
                    <Grid item xs={11}>
                        <List className={classes.messageArea}>
                            {messagesList}
                            <ListItem ref={scrollRef} />
                        </List>
                        <Divider />
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField disabled={disabled}
                                           id="outlined-basic-email"
                                           label="Type Something"
                                           fullWidth
                                           onKeyPress={event => {
                                               if (event.key === 'Enter'){
                                                   sandMessage();
                                               }
                                           }}
                                           onChange={(e)=>{
                                               saveMessage(e.target.value)
                                           }}
                                           value={messages}
                                />
                            </Grid>
                            <Grid xs={1} align="right">
                                <Fab disabled={disabled}
                                     color="primary"
                                     aria-label="add"
                                     onClick={sandMessage}>
                                    <SendIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
}