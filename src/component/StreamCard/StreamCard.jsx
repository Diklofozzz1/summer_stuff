import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";

import {useStyles} from './StreamCardStyle'

export default function StreamCard({userName, streamName}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={() => history.push(`/stream/${userName}`)}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
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