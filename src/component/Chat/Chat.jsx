import React from 'react';
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
    const message = 'hi there';

        return (

            <div>
                <Grid className={classes.chatSection}>
                    <Grid item xs={11}>
                        <List className={classes.messageArea}>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={message} secondary={`By ${userName}`} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField disabled={disabled} id="outlined-basic-email" label="Type Something" fullWidth />
                            </Grid>
                            <Grid xs={1} align="right">
                                <Fab disabled={disabled} color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
}