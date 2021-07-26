import React from 'react';
import { Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import {MessageBox} from "../../components/message";

const useStyles = makeStyles(()=> ({
    root:{
        height: '100%',
        width: '100%',
    },
    '@global': {
        body: {
            background: 'transparent',
        },
    },
}));

const ChatContent = observer(()=> {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <MessageBox />
        </Grid>
    )

});

export default ChatContent