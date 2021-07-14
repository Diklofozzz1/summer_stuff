import React, {useState} from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';

import {
    AppBar, Toolbar, Typography,
    Menu, MenuItem,
    Button, IconButton,
    DialogContentText, DialogContent,
    DialogActions, DialogTitle, Dialog,
    TextField } from '@material-ui/core';

import {useStyles} from "./AppBarStyle";

export default function MenuAppBar() {
    const email = ''
    const password = ''


    const classes = useStyles();
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const [openModal, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = (isAuth) => {
        if (isAuth) {
            setAuth(true);
            setAnchorEl(null);
        }

        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
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
                                        <MenuItem className={classes.logout} onClick={()=>{setAuth(false)}}>Выйти </MenuItem>
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
                                                value={email}
                                                type="email"
                                                fullWidth
                                            />
                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Password"
                                                value={password}
                                                type="password"
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={()=>{handleCloseModal(false)}} color="primary">
                                                Назад
                                            </Button>
                                            <Button onClick={()=>{handleCloseModal(true)}} color="primary">
                                                Войти
                                            </Button>
                                            <Button onClick={()=>{handleCloseModal(false)}} color="primary">
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