import {makeStyles} from "@material-ui/core/styles";

const colorSpectrum = {
    lightBlue: ''
}

export const useStyles = makeStyles((theme) => ({
    chatSection: {
        display: "inline-block",
        width: "25vw",
        height: '70%'
    },
    messageArea: {
        height: "80vh",
        overflowY: 'auto'
    }
}));