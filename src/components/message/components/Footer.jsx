import React from 'react';
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import SendIcon from '@material-ui/icons/Send';
import {UserStore} from "../../../store/user";
import {MessagesStore} from "../../../store/message";

const useStyles = makeStyles((theme) => ({
    root: {
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
    btn: {
        height: '2rem',
        fontSize: 22,
        width: '2rem',
        color: ({disabled}) => disabled ? 'rgba(0, 0, 0, 0.3)' : theme.palette.primary.main,
        '&:focus, &:hover': {
            backgroundColor: 'unset !important'
        },
    },
    icon:{
        fontSize: '2rem'
    }
}));

const Footer = observer(() => {
    const [message, setMessage] = React.useState('');
    const classes = useStyles({disabled: !message});

    const onKeyDown = (event)=>{
        if(message){
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                onSubmit();
            }
        }

    }

    const onSubmit = () => {
        const messageData = {
            sender: UserStore.user.id,
            message: message
        }
        void MessagesStore.addNewMessage(messageData);
        setMessage('')
    }

    return (
        <Grid container direction={'row'} alignItems={'center'} justify={'space-between'} className={classes.root}>
            <Grid item>
                <TextField
                    value={message}
                    placeholder={'Write a message'}
                    type="string"
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    onBlur={(event) => setMessage(event.target.value)}
                    onKeyDown={onKeyDown}
                    InputProps={{
                        className: classes.inputBase,
                        disableUnderline: true,
                        inputProps: {
                            className: classes.input,
                        },
                    }}
                    fullWidth
                />
            </Grid>
            <Grid item>
                <Button variant={'text'} className={classes.btn} endIcon={<SendIcon className={classes.icon}/>} onClick={onSubmit}
                        disabled={!message}/>
            </Grid>
        </Grid>
    )
});

export default Footer;