import {makeStyles} from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({

    large: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2vh",
        width: theme.spacing(20),
        height: theme.spacing(20),
    },

    text:{
        textAlign: "center",
       // color: "black",
    },

    textField:{
        textAlign:"center",
        width: "3vw",
    },

    root: {
        maxWidth: 'sm',
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));