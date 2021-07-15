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

export default function Chat({disabled}) {
    const classes = useStyles();
    const userName = 'blabla';

    const [messagesList, addMessage] = useState([]);
    const [messages, saveMessage] = useState('');

    const sandMessage = () => {
        if (!messages.length)
            return;

        addMessage([
            ...messagesList,
            (<ListItem key="1">
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary={messages} secondary={`By ${userName}`} />
                    </Grid>
                </Grid>
            </ListItem>)
        ]);
        saveMessage('');
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