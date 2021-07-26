import React from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import {observer} from "mobx-react";
import Header from './components/Header';
import MessagesContainer from "./components/MessagesContainer";
import Footer from "./components/Footer";
import Classnames from "classnames";

const useStyles = makeStyles(() => ({
    root:{
        height: '100%',
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        position: 'relative'
    },
    fullWidth:{
        width: '100%'
    },
    messagesBody:{
        flex:1
    },
    footer:{
        position: 'absolute',
        bottom: 0
    }
}));

const MessageBox = observer(()=> {
    const classes = useStyles();

    return (
        <Grid container direction={'column'} wrap={'nowrap'} className={classes.root}>
           <Grid item className={classes.fullWidth}>
                <Header />
           </Grid>
            <Grid item className={Classnames(classes.messagesBody, classes.fullWidth)}>
                <MessagesContainer />
            </Grid>
            <Grid item className={Classnames(classes.fullWidth, classes.footer)}>
                <Footer />
            </Grid>
        </Grid>
    )

});

export default MessageBox;