import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import { WidgetFrame } from  '../frames/widget'
import {ChatFrame} from "../frames/chat";
import {UiStore} from "../store/ui";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f4f8',
        position: 'relative'
    },
    chatPopup:{
        width: '50vh',
        height: '70vh',
        position: 'fixed',
        bottom: '14vh',
        right: '4vh',
        zIndex: ({opened}) => opened ? 2147483645 : -1,
    },
    widget:{
        zIndex: 2147483646,
        position: 'fixed',
        right: '4vh',
        bottom: '4vh',
        margin: 'auto',
        width: 'fit-content',
    }
}))

const Layout = observer(() => {

    const classes = useStyles({opened: UiStore.opened});

    return (
        <Grid className={classes.root} container alignItems="flex-end" justify="flex-end">
            <Grid item className={classes.chatPopup}>
                <ChatFrame />
            </Grid>
            <Grid item className={classes.widget}>
                <WidgetFrame />
            </Grid>
        </Grid>
    )

})

export default Layout;