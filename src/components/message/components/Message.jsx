import React from 'react';
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import {observer} from "mobx-react";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme)=> ({
    root:{
        backgroundColor: '#fff',
        borderTop: '2px solid #f2f5f8',
        padding: 4,
        borderRadius: '0px 0px 8px 8px'
    },
    inputBase: {
        transition: 'all 500ms ease-out',
        borderRadius: 2,
        backgroundColor: '#fff',
        color: '#000',
    },
    input: {
        fontSize: 14,
        lineHeight: 1.8,
        padding: theme.spacing(1.5, 2),
    },
    btn:{
        height: '2rem',
        fontSize: 22,
        width: '2rem',
        color: ({disabled}) => disabled? 'rgba(0, 0, 0, 0.3)' : theme.palette.primary.main,
        '&:focus, &:hover': {
            backgroundColor: 'unset !important'
        },
    }
}));

const Message = observer(()=> {
    const classes = useStyles();

    return (
        <Grid container direction={'column'} alignItems={'center'} justify={'space-between'} className={classes.root}>

        </Grid>
    )
});

export default Message;