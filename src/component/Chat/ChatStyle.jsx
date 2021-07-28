import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    chatSection: {
        display: "inline-block",
        width: "27vw",
        height: '75%'
    },
    messageArea: {
        height: "75vh",
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.1em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
}));