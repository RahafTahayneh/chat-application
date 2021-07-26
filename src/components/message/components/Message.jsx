import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import Classnames from "classnames";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(234, 240, 246)',
        minHeight: 32,
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: 'rgb(203, 214, 226)',
        color: 'rgb(66, 91, 118)',
        borderRadius: '0px 8px 8px',
        maxWidth: 200,
        width: 'fit-content',
        padding: theme.spacing(1, 2),
        marginLeft: theme.spacing(3),
        fontSize: 14,
        marginTop: theme.spacing(1)
    }
}));

const Message = observer(({message, className}) => {
    const classes = useStyles();

    return (
        <Grid container direction={'column'} alignItems={'center'}
              className={Classnames(className, classes.root)}>
            {message}
        </Grid>
    )
});

export default Message;