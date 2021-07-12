import React from 'react';
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

import {useStyles} from "./AppBarStyle";

export default function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            {/*<FormGroup>*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}*/}
            {/*        label={auth ? 'Logout' : 'Login'}*/}
            {/*    />*/}
            {/*</FormGroup>*/}
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
                        <Typography variant="h7">
                            <MenuItem onClick={handleClose}>Войти</MenuItem>
                        </Typography>
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
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Информация для вещания</MenuItem>
                                <MenuItem onClick={handleClose}>Настройки</MenuItem>
                                <MenuItem className={classes.logout} onClick={handleChange}>Выйти </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}