import {makeStyles} from "@material-ui/core/styles";

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
    }
}));