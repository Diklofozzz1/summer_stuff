import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {useStyles} from "./AppBarStyle";

export default function MenuAppBar() {

    const email = ''
    const password = ''


    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMenu, setOpenMenu] = React.useState(null);

    const open = Boolean(anchorEl);

    const [openModal, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (isClose) => {
        setAnchorEl(isClose);
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
                                <MenuItem onClick={handleClose}>Трансляции онлайн</MenuItem>
                            </Typography>
                        </div>
                        {auth &&(
                            <div className={classes.appbar_buttons}>
                                <Typography variant="h7">
                                    <MenuItem onClick={handleClose}>Отслеживаемое</MenuItem>
                                </Typography>
                            </div>
                        )}
                    </div>

                    {!auth && (
                        <div>
                            <Typography variant="h7">
                                <MenuItem onClick={handleClickOpen}>Войти</MenuItem>
                            </Typography>
                            <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                                    <Button onClick={handleCloseModal} color="primary">
                                        Назад
                                    </Button>
                                    <Button onClick={() => {handleCloseModal(); setAuth(true)}} color="primary">
                                        Войти
                                    </Button>
                                    <Button onClick={handleCloseModal} color="primary">
                                        Зарегестрироваться
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )}

                    {auth && (
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
                                open={open}
                                onClose={()=>{handleClose(false)}}
                            >
                                <MenuItem onClick={handleClose}>Информация для вещания</MenuItem>
                                <MenuItem onClick={handleClose}>Настройки</MenuItem>
                                <MenuItem className={classes.logout} onClick={()=>{setAuth(false)}}>Выйти </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}