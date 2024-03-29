import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import {cookie} from "../../endpoint/cookie";

import {apiLog, apiReg, apiStreamKey, apiStreamName} from "../../api/api";

import {AccountCircle, Visibility, VisibilityOff} from '@material-ui/icons';

import {
    AppBar, Toolbar, Typography,
    Menu, MenuItem,
    Button, IconButton,
    DialogContentText, DialogContent,
    DialogActions, DialogTitle, Dialog,
    TextField
} from '@material-ui/core';

import {useStyles} from "./AppBarStyle";
import {PaletteContext} from '../../palette/PaletteContext';
import UserProfile from "../UserProfile/UserProfile";


export function MenuAppBar({parent}) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(cookie.get('username') || '');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPass, showPassword] = useState(false);
    const [showKey, showStreamKey] = useState(false);
    const [showConfPass, showConfirmedPass] = useState(false);
    const [auth, setAuth] = useState(cookie.get('isAuth') === 'true');
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpen] = useState(false);
    const [streamKey, setStreamKey] = useState('');
    const [streamServerName, setStreamServerName] = useState('');
    const [streamName, setStreamName] = useState('');

    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleClickOpen = () => {
        setOpen(true);
        clearFields();
    };

    const handleStreamKey = () => {
        apiStreamKey(username).then((response) => {
            if (response.data.detail === 200) {
                const _streamKey = response.data.privateStreamKey.substring(7).split('/')
                setStreamKey(_streamKey[2]);
                setStreamServerName(`rtmp://${_streamKey[0]}/${_streamKey[1]}/`)
            } else {
                alert('Нет такого пользователя');
            }
        }).catch((error) => {
            alert('Сервер не отвечает!');
            console.log(error);
        })
    }

    const handleCloseModal = () => {
        apiLog(username, password).then((response) => {
            if (response.status === 200) {
                setAuth(true);
                cookie.set('isAuth', true, {path: '/'});
                setUsername(username);
                cookie.set('username', username, {path: '/'});
                parent.setState({isAuth: true});
                setAnchorEl(null);
            }
        }).catch((error) => {
             if(error.response.status === 401){
                alert('Не правильно введены данные! Попробуйте еще раз.')
            }else{
                 alert('Сервер не отвечает!');
                 console.log(error);
             }
        })
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const clearFields = () => {
        setEmail('');
        setPassword('');
        setConfirmedPassword('');
    }
    //
    // const openUserProfile = () => {
    //    return
    // }

    const checkEmail = (email) => {
        return validateEmail.test(email);
    }

    const handleRegModal = () => {
        apiReg(username, email, password).then((response) => {
            if (response.status === 201) {
                apiLog(username, password).then((response) => {
                    if (response.status === 200) {
                        setAuth(true)
                        cookie.set('isAuth', true, {path: '/'});
                        cookie.set('username', username, {path: '/'});
                        setAnchorEl(null);
                        parent.setState({isAuth: true});
                        // setUsername(username);
                    }
                }).catch((error) => {
                    if (error.response.status === 400) {
                        alert('Пользователь с такими полями уже создан!');
                    }else{
                        alert('Сервер не отвечает!');
                        console.log(error)
                    }
                })
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                alert('Пользователь с такими полями уже создан!');
            }else{
                alert('Сервер не отвечает!');
                console.log(error)
            }
        })
    }

    const [regModel, openRegModal] = useState(false);


    const [state, setState] = React.useState({
        checkedA: false
    });

    const handleThemeChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const context = useContext(PaletteContext);

    const [userProfile, openUserProfile] = useState(false);

    const [infoModal, openInfoModal] = useState(false);

    const history = useHistory();

    console.log('aaa');

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>

                    <Dialog open={regModel} onClose={() => {
                        openRegModal(false)
                    }} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Добро пожаловать на KEKW.tv</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Введите необходимые поля
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="Your username"
                                error={username.length < 5}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                id="email"
                                label="Email Address"
                                error={!checkEmail(email)}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                id="name"
                                label="Password (more then 8 characters)"
                                value={password}
                                error={password.length < 8}
                                onChange={e => setPassword(e.target.value)}
                                type={showPass ? '' : 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: showPass ?
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {
                                                showPassword(false)
                                            }}
                                            children={<Visibility/>}
                                            color="inherit"/>
                                        :
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {
                                                showPassword(true)
                                            }}
                                            children={<VisibilityOff/>}
                                            color="inherit"/>
                                }}
                            />

                            <TextField
                                lab
                                margin="dense"
                                id="name"
                                label="Confirm password"
                                value={confirmedPassword}
                                onChange={e => setConfirmedPassword(e.target.value)}
                                type={showConfPass ? '' : 'password'}
                                error={password !== confirmedPassword || confirmedPassword.length === 0}
                                fullWidth
                                InputProps={{
                                    endAdornment: showConfPass ?
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {
                                                showConfirmedPass(false)
                                            }}
                                            children={<Visibility/>}
                                            color="inherit"/>
                                        :
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {
                                                showConfirmedPass(true)
                                            }}
                                            children={<VisibilityOff/>}
                                            color="inherit"/>
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => {
                                openRegModal(false);
                                clearFields();
                            }} color="primary">
                                Назад
                            </Button>
                            <Button disabled={username.length < 5 || !checkEmail(email) || password.length < 8 || password !== confirmedPassword || confirmedPassword.length === 0} variant="contained" onClick={() => {
                                openRegModal(false);
                                handleRegModal()
                            }} color="primary">
                                Зарегестрироваться
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/*--------------------------------------------------------------*/}

                    <Dialog maxWidth={'md'}
                            open={infoModal}
                            onClose={() => {
                                openInfoModal(false)
                            }}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Спасибо, что выбираете KEKW.tv</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                В данном окне сообщается информация для успешного вещания на нашей площадке.
                                Убедительная просьба <b style={{color: 'red'}}>НИКОМУ НЕ СООБЩАЙТЕ</b> информацию,
                                предоставленную в данном окне!
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label='Сервер для вещания:'
                                    value={streamServerName}
                                    type={'string'}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label='Ваш ключ потока:'
                                    value={streamKey}
                                    type={showKey ? '' : 'password'}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: showKey ?
                                            <IconButton
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => {
                                                    showStreamKey(false)
                                                }}
                                                children={<Visibility/>}
                                                color="inherit"/>
                                            :
                                            <IconButton
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => {
                                                    showStreamKey(true)
                                                }}
                                                children={<VisibilityOff/>}
                                                color="inherit"/>
                                    }}
                                />

                            </DialogContentText>

                            <DialogContentText>
                                Скажите, что вы соираетесь стримить:
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="stream name (more then 50 characters or less then 5)"
                                    value={streamName}
                                    error={streamName.length > 50 || streamName.length < 5}
                                    onChange={e => setStreamName(e.target.value)}
                                    type={'string'}
                                    fullWidth
                                />
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => {
                                openInfoModal(false)
                            }} color="primary">
                                Назад
                            </Button>
                            <Button variant="contained" onClick={() => {
                                openInfoModal(false);
                                apiStreamName(username, streamName).then(_ => {
                                    alert('Название стрима успешно установлено!');
                                }).catch(err => {
                                    console.warn('Cant update stream name', err);
                                })
                            }} color="primary">
                                Подтвердить
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/*---------------------------------------------*/}

                    <UserProfile username = {username} isOpen={userProfile} handler = {openUserProfile}/>

                    {/*------------------------------*/}

                    <Typography variant="h4" className={classes.title}>
                        KEKW.tv
                    </Typography>
                    <div className={classes.appbar_buttons_group}>
                        <div className={classes.appbar_buttons}>
                            <Typography variant="subtitle1">
                                {/*<a href='/' style={{*/}
                                {/*    cursor: 'default',*/}
                                {/*    textDecoration: 'none',*/}
                                {/*    color: 'white'*/}
                                {/*}}>*/}
                                    <MenuItem onClick={() => {history.push('/');  document.getElementById('player').style.display = 'none'}}>
                                        Трансляции онлайн
                                    </MenuItem>
                                {/*</a>*/}

                            </Typography>
                        </div>
                        {/*{auth ? (*/}
                        {/*    (<div/>)*/}
                        {/*    // <div className={classes.appbar_buttons}>*/}
                        {/*    //     <Typography variant="subtitle1">*/}
                        {/*    //         <MenuItem>Отслеживаемое</MenuItem>*/}
                        {/*    //     </Typography>*/}
                        {/*    // </div>*/}
                        {/*) : (<div/>)}*/}
                    </div>

                    {
                        auth === true ?
                            (
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={() => {
                                            setAnchorEl(undefined)
                                        }}
                                    >
                                        <MenuItem onClick={()=>{openUserProfile(true); console.log('111')}}>В системе под именем: {username}</MenuItem>
                                        <MenuItem onClick={() => {
                                            openInfoModal(true);
                                            handleStreamKey()
                                        }}>Информация для вещания</MenuItem>

                                        {/*<MenuItem onClick={()=>{}}>Настройки</MenuItem>*/}

                                        <MenuItem onClick={context.toggleTheme}>
                                            {/*<Switch checked={state.checkedA} onChange={(event) => {*/}
                                            {/*    ;*/}
                                            {/*    setState({...state, [event.target.name]: event.target.checked});*/}
                                            {/*}} name="checkedA"/>*/}
                                            Dark mode
                                        </MenuItem>
                                        <MenuItem className={classes.logout} onClick={() => {
                                            setAuth(false);
                                            console.log('log out event')
                                            cookie.set('isAuth', false, {path: '/'});
                                            // setUsername('');
                                            cookie.set('username', '', {path: '/'});
                                            parent.setState({isAuth: false})
                                        }}>
                                            Выйти
                                        </MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <div>
                                    <Typography variant="subtitle1">
                                        <MenuItem onClick={handleClickOpen}>Войти</MenuItem>
                                    </Typography>
                                    <Dialog open={openModal} onClose={() => {
                                        setOpen(false)
                                    }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Добро пожаловать на KEKW.tv</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Добро пожаловать на сайт! Для входа в систему введите ваш почтовый адрес и
                                                пароль!
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="email"
                                                label="Username"
                                                error={!username.length > 0}
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                type="email"
                                                fullWidth
                                            />

                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Password (more then 8 characters)"
                                                value={password}
                                                error={password.length < 8}
                                                onChange={e => setPassword(e.target.value)}
                                                type={showPass ? '' : 'password'}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: showPass ?
                                                        <IconButton
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            onClick={() => {
                                                                showPassword(false)
                                                            }}
                                                            children={<Visibility/>}
                                                            color="inherit"/>
                                                        :
                                                        <IconButton
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            onClick={() => {
                                                                showPassword(true)
                                                            }}
                                                            children={<VisibilityOff/>}
                                                            color="inherit"/>
                                                }}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" onClick={() => {setOpen(false)
                                            }} color="primary">
                                                Назад
                                            </Button>
                                            <Button disabled={username.length < 0 || password.length < 8} variant="contained" onClick={() => {
                                                handleCloseModal()
                                            }} color="primary">
                                                Войти
                                            </Button>
                                            <Button variant="contained" onClick={() => {
                                                openRegModal(true);
                                            }} color="primary">
                                                Зарегистрироваться
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
