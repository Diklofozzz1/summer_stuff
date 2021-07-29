import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";

import {useStyles} from './StreamCardStyle'

export default function StreamCard({userName, streamName, disableRedirect}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={() => {if (disableRedirect){history.push(`/stream/${userName}`)}}}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`http://90.188.92.68:8080/app/${userName}_preview/thumb.png`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {streamName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}