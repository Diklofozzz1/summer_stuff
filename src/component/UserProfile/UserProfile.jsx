import {
    Avatar,
    Dialog,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    IconButton, DialogTitle, DialogContent, TextField, DialogActions, Button, DialogContentText, NativeSelect
} from "@material-ui/core";

import React, {useState} from "react";
import {useStyles} from "./UserProfileStyle";
import {apiAddMoreUserInfo, apiUserInfo, apiUserSubscriptions} from "../../api/api";
import StreamCard from "../StreamCard/StreamCard";
import {Countries} from "../../endpoint/countries";
import {cookie} from "../../endpoint/cookie";


import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';




export default function UserProfile({username, isOpen, handler}){
    const classes = useStyles();

    const [age, setAge] = useState(1);
    const [countryShort, setCountryShort] = useState('RU');
    const [subCards, setCards] = useState(null);
    const [description, setDescription] = useState('')
    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const countryList = () => {
        let list = []

        for (const [key, value] of Object.entries(Countries)) {
            list.push(<option value={value}>{key}</option>)
        }
        return list
    }

    // let subCards = []
    const handleSubs = () => {
        apiUserSubscriptions(username).then((response)=>{
            let cards = [];

            if (!response.data[0].subscribe)
                return;

            const subscriptions = response.data[0].subscribe;
            for(const user of subscriptions){
                cards.push(<StreamCard userName={user} disableRedirect={false}/>);
            }
            setCards(cards);
        }).catch(err => {
            console.log(err);
        })
    }

    if(!subCards){
        handleSubs()
    }

    const infoAddHandle = () => {
        apiAddMoreUserInfo(username, age, countryShort, description).then(response => {
            if (response.status === 200){
                alert('информация прменена успешно');
            }else {
                alert('недопустимое значение в ячейках')
            }
        }).catch(err=>{
            console.log(err)
    })}

    const getInfoHandle = () => {
        apiUserInfo(username).then(response => {
            if (response.status === 200){
                setAge(parseInt(response.data[0].age))
                setCountryShort(response.data[0].country)
                setDescription(response.data[0].information)
            }else{
                alert('Ошибак сервера')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const findCountryByCut = (object, value) => {
        if (!value) {
            return '';
        }

        return Object.keys(object).find(key => object[key] === value);
    }

    if(!age && !countryShort.length && !description.length){
        getInfoHandle();
    }



    return(
        <div>
            <Dialog
                maxWidth={'sm'}
                fullWidth
                scroll={'body'}
                open={isOpen}
                onClose={() => {handler(false); setExpanded(false)}}
            >
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} />
                        }
                        action={
                            cookie.get('username') !== username ?
                                <div/> :
                                <IconButton onClick={handleClickOpen} aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                        }
                        title= {username}
                        subheader={`Страна: ${findCountryByCut(Countries, countryShort.toUpperCase())}, Возраст: ${age}`}
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        <Typography style={{margin: 0}}  paragraph>Посмотреть подписки</Typography>
                        <CardActions disableSpacing >
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={() => {handleExpandClick(); handleSubs()}}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div id="stream-online" style={{
                                display:'flex',
                                flexWrap: "wrap",
                                justifyContent:'center',
                                alignItems:'center',}}>
                                {subCards ? subCards : 'Нет подписок или попробуйте отключить AddBlock'}

                            </div>
                        </CardContent>
                    </Collapse>
                </Card>
            </Dialog>

            <Dialog maxWidth={'sm'}
                    fullWidth
                    open={openModal}
                    onClose={() => {
                                setOpen(false)
                    }}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Измените информацию о себе</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Напишите свой возраст и страну, а также расскажите о себе в описании!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        inputProps={{min: 1, style: { textAlign: 'center' }}}
                        id="age"
                        value={age}
                        error={age>120 || !age}
                        // value={streamName}
                        // error={streamName.length > 50 || streamName.length < 5}
                        onChange={e => setAge(parseInt(e.target.value))}
                        type={'number'}
                    />
                    <DialogContentText>
                        Укажите возраст
                    </DialogContentText>
                    <NativeSelect
                        fullWidth
                        margin="dense"
                        value={countryShort}
                        onChange={e => {setCountryShort(e.target.value)}}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    >
                        {countryList()}
                    </NativeSelect>
                    <DialogContentText>
                        Выберите страну
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        inputProps={{min: 1, style: { textAlign: 'center' }}}
                        id="description"
                        value={description}
                        error={description.length > 500}
                        // value={streamName}
                        // error={streamName.length > 50 || streamName.length < 5}
                        onChange={e => setDescription(e.target.value)}
                        type={'string'}
                    />
                    <DialogContentText>
                        Расскажите о своем канале
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {setOpen(false)
                    }} color="primary">
                        Назад
                    </Button>
                    <Button variant="contained" onClick={() => {
                        infoAddHandle();
                        setOpen(false)
                    }} color="primary">
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
