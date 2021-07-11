import {makeStyles} from "@material-ui/core/styles";

const colorSpectrum = {
    lightBlue: ''
}

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
       // backgroundColor: '#9AA2BF',
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        //flexGrow: 1,
    },

    appbar: {
        backgroundColor: '#9AA2BF',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },

    appbar_buttons_group:{
        flexGrow: 1,
    },

    appbar_buttons:{
        marginLeft: theme.spacing(2),
        display:"inline-block"
    },

    logout:{
        color: "red",
    },
}));