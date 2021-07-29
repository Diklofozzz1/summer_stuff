import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Typography,
    NativeSelect,
} from "@material-ui/core";
import React, {useState} from "react";
import {useStyles} from "./UserProfileStyle";
import {apiAddMoreUserInfo, apiUserInfo, apiUserSubscriptions} from "../../api/api";
import StreamCard from "../StreamCard/StreamCard";
import {Countries} from "../../endpoint/countries";
import { cookie } from '../../endpoint/cookie';


export default function UserProfile({username, isOpen, handler}){
    const classes = useStyles();

    const [age, setAge] = useState(0);
    const [countryShort, setCountryShort] = useState('');
    const [subCards, setCards] = useState(null);
    const [description, setDescription] = useState('')

    const countryList = () => {
        let list = []

        for (const [key, value] of Object.entries(Countries)) {
            list.push(<option value={value}>{key}</option>)
        }
        return list
    }

    // let subCards = []
    if(!subCards){
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

    if(!age && !countryShort.length && !description.length){
        getInfoHandle();
    }



    return(
        <Dialog
            maxWidth={'md'}
            fullWidth
            open={isOpen}
            onClose={() => {handler(false); setCards(null)}}
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
                        Возраст: <TextField
                                            inputProps={{min: 1, style: { textAlign: 'center' }}}
                                            id="age"
                                            className={classes.textField}
                                            value={age}
                                            error={age>120 || !age}
                                            disabled={cookie.get('username')!==username}
                                            // value={streamName}
                                            // error={streamName.length > 50 || streamName.length < 5}
                                            onChange={e => setAge(parseInt(e.target.value))}
                                            type={'number'}
                                            />
                    </Typography>

                    <Typography variant="subtitle1">
                        Страна:<NativeSelect
                                defaultValue={'RU'}
                                value={countryShort}
                                onChange={e => {setCountryShort(e.target.value)}}
                                disabled={cookie.get('username')!==username}
                                inputProps={{
                                    name: 'name',
                                    id: 'uncontrolled-native',
                                    min: 1,
                                    style: { textAlign: 'center' }
                                }}
                            >
                                {countryList()}
                            </NativeSelect>
                    </Typography>

                    <Typography variant="subtitle1">
                        <TextField
                            margin="dense"
                            id="name"
                            label="description (more then 500 characters)"
                            value={description}
                            disabled={cookie.get('username')!==username}
                            error={description.length > 500}
                            onChange={e => setDescription(e.target.value)}
                            type={'string'}
                            fullWidth
                        />
                    </Typography>

                    <Typography variant="subtitle1">
                        Подписки:
                    </Typography>
                    <div id="stream-online" style={{
                                                    display:'flex',
                                                    flexWrap: "wrap",
                                                    justifyContent:'center',
                                                    alignItems:'center',}}>
                        {subCards ? subCards : 'Нет подписок или попробуйте отключить AddBlock'}

                    </div>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                { cookie.get('username')!==username ?
                <div/> :
                <Button  variant="contained" color="primary" onClick={()=>{infoAddHandle()}}>
                    Применить
                </Button>
                }
                <Button variant="contained" color="primary" onClick={()=>{handler(false); setCards(null)}}>
                    Назад
                </Button>
            </DialogActions>
        </Dialog>
    )
}
