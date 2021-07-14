import React, {useContext, useState} from 'react';

import {cookie} from "../../endpoint/cookie";

import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';

import {
    AppBar, Toolbar, Typography,
    Menu, MenuItem,
    Button, IconButton,
    DialogContentText, DialogContent,
    DialogActions, DialogTitle, Dialog,
    TextField, FormControlLabel, Switch
} from '@material-ui/core';

import {useStyles} from "./AppBarStyle";
import { PaletteContext, themes } from '../../palette/PaletteContext';

export default function MenuAppBar({parent}) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPass, showPassword] = useState(false);
    const [showConfPass, showConfirmedPass] = useState(false);
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpen] = useState(false);

    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleClickOpen = () => {
        setOpen(true);
        clearFields();
    };

    const handleCloseModal = (isAuth) => {
        if (isAuth) {
            setAuth(true);
            setAnchorEl(null);

            cookie.set('isAuth', true);
            parent.setState({isAuth: true});
        }

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

    const checkEmail = (email) => {
        return validateEmail.test(email);
    }

    const [regModel, openRegModal] = useState(false);

    const [state, setState] = React.useState({
        checkedA: false,
    });

    const handleThemeChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const context = useContext(PaletteContext);
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Dialog open={regModel} onClose={() => {openRegModal(false)}} aria-labelledby="form-dialog-title">
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
                                autoFocus
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
                                type= {showPass ? '': 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: showPass ?
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {showPassword(false)}}
                                            children={<Visibility />}
                                            color="inherit" />
                                        :
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {showPassword(true)}}
                                            children={<VisibilityOff />}
                                            color="inherit" />
                                }}
                            />

                            <TextField
                                lab
                                margin="dense"
                                id="name"
                                label="Confirm password"
                                value={confirmedPassword}
                                onChange={e => setConfirmedPassword(e.target.value)}
                                type= {showConfPass ? '': 'password'}
                                error={password !== confirmedPassword || confirmedPassword.length === 0}
                                fullWidth
                                InputProps={{
                                    endAdornment: showConfPass ?
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {showConfirmedPass(false)}}
                                            children={<Visibility />}
                                            color="inherit" />
                                        :
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => {showConfirmedPass(true)}}
                                            children={<VisibilityOff />}
                                            color="inherit" />
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{openRegModal(false); clearFields();}} color="primary">
                                Назад
                            </Button>
                            <Button onClick={()=>{openRegModal(false);}} color="primary">
                                Зарегестрироваться
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Typography variant="h4" className={classes.title}>
                        KEKW.tv
                    </Typography>
                    <div className={classes.appbar_buttons_group}>
                        <div className={classes.appbar_buttons}>
                            <Typography variant="h7">
                                <MenuItem>Трансляции онлайн</MenuItem>
                            </Typography>
                        </div>
                        {auth &&(
                            <div className={classes.appbar_buttons}>
                                <Typography variant="h7">
                                    <MenuItem>Отслеживаемое</MenuItem>
                                </Typography>
                            </div>
                        )}
                    </div>

                    {
                        auth ?
                            (
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
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
                                        onClose={()=>{setAnchorEl(undefined)}}
                                    >
                                        <MenuItem onClick={()=>{}}>Информация для вещания</MenuItem>
                                        <MenuItem onClick={()=>{}}>Настройки</MenuItem>

                                        <Switch checked={true} onChange={(event) => {

                                            context.toggleTheme();
                                            setState({ ...state, [event.target.name]: event.target.checked });
                                        }} name="checkedA"/>

                                        <MenuItem className={classes.logout}    onClick={()=>{setAuth(false);
                                                                                cookie.set('isAuth', false);
                                                                                parent.setState({isAuth: false})}}>
                                            Выйти
                                        </MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <div>
                                    <Typography variant="h7">
                                        <MenuItem onClick={handleClickOpen}>Войти</MenuItem>
                                    </Typography>
                                    <Dialog open={openModal} onClose={() => {setOpen(false)}} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Добро пожаловать на KEKW.tv</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Добро пожаловать на сайт! Для входа в систему введите ваш почтовый адрес и пароль!
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
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
                                                type= {showPass ? '': 'password'}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: showPass ?
                                                        <IconButton
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            onClick={() => {showPassword(false)}}
                                                            children={<Visibility />}
                                                            color="inherit" />
                                                        :
                                                        <IconButton
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            onClick={() => {showPassword(true)}}
                                                            children={<VisibilityOff />}
                                                            color="inherit" />
                                                }}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={()=>{handleCloseModal(false)}} color="primary">
                                                Назад
                                            </Button>
                                            <Button onClick={()=>{handleCloseModal(true)}} color="primary">
                                                Войти
                                            </Button>
                                            <Button onClick={()=>{handleCloseModal(false); openRegModal(true);}} color="primary">
                                                Зарегестрироваться
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