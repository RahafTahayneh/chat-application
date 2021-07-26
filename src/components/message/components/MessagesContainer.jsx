import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import _ from 'lodash';
import {CollapsableSection} from "../../collapse";
import UserProfile from "./UserProfile";
import Message from "./Message";
import {AdminStore} from "../../../store/admin";
import {MessagesStore} from "../../../store/message";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    messageContainer: {
        marginTop: theme.spacing(2),
        height: 'calc(400px - 16px)',
        width: '100%',
        '@media (max-width: 350px)': {
            height: 'calc(350px - 16px)',
        }
    },
    profile: {
        borderLeft: '2px solid #f2f5f8'
    },
    message: {
        borderRadius: '8px 0px 8px 8px',
        marginRight: theme.spacing(2),
        borderColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgb(0, 164, 189)',
        color: 'rgb(255, 255, 255)',
    },
    messages: {
        height: '100%',
        overflow: 'scroll',
        width: '100%',
        '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
        },
    }
}));

const MessagesContainer = observer(() => {
    const classes = useStyles();
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };
    React.useEffect(scrollToBottom, [MessagesStore.messages]);

    return (
        <Grid container direction={'row'} wrap={'nowrap'} className={classes.root}>
            <Grid item className={classes.messageContainer}>
                <Grid container direction={'column'} alignItems={'flex-end'} wrap={'nowrap'}
                      className={classes.messages}>
                    <Grid item container alignItems={'flex-start'}>
                        <Message message={AdminStore.admin.message}/>
                    </Grid>
                    {
                        _.map(MessagesStore.messages, (message, index) =>
                            <Message key={index} message={message.message} className={classes.message}/>
                        )
                    }
                    <div ref={messagesEndRef}/>
                </Grid>

            </Grid>
            <Grid item className={classes.profile}>
                <CollapsableSection>
                    <UserProfile/>
                </CollapsableSection>
            </Grid>
        </Grid>
    )
});

export default MessagesContainer;