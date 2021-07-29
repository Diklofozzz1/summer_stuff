import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useStyles} from "./UserProfileStyle";
import {apiStreamPool} from "../../api/api";
import StreamCard from "../StreamCard/StreamCard";


export default function UserProfile({username, isOpen, handler}){
    const classes = useStyles();
    const [subCards, setCards] = useState([]);

    // let subCards = []

    useEffect(()=>{
        apiStreamPool().then((response)=>{
            let _data = response.data;
            let cards = [];
            for(let key in _data){
                if (_data.hasOwnProperty(key)){
                    cards.push(<StreamCard userName={key} streamName={_data[key][1]}/>);
                }
            }
            setCards(cards);
        }).catch(err => {
            console.log(err);
        })
    })

    return(
        <Dialog
            maxWidth={'md'}
            open={isOpen}
            onClose={() => {handler(false)}}
        >
            <DialogContent>
                <Avatar src="/static/images/avatar/1.jpg" className={classes.large} />
                <DialogContentText
                    className={classes.text}
                    id="scroll-dialog-description"
                >
                    <Typography variant="h4">
                        {username}
                    </Typography>

                    <Typography variant="subtitle1">
                        Возраст: {username}
                    </Typography>

                    <Typography variant="subtitle1">
                        Страна: {username}
                    </Typography>

                    <Typography variant="subtitle1">
                        Информация: бла бла бла я такой то такйо то был там то там то и поехал он в село и приехал а потом опять уехал и нахуй запятые не нужны{username}
                    </Typography>

                    <hr/>
                    <Typography variant="subtitle1">
                        Подписки:
                    </Typography>
                    <div id="stream-online" style={{
                                                    display:'flex',
                                                    flexWrap: "wrap",
                                                    justifyContent:'center',
                                                    alignItems:'center',}}>
                        {subCards.length ? subCards : 'Нет доступных стримов или попробуйте отключить AddBlock'}

                    </div>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={()=>{handler(false)}}>
                    Назад
                </Button>
            </DialogActions>
        </Dialog>
    )
}
