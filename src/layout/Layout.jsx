import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import {isMobile} from "react-device-detect";
import Classnames from "classnames";
import {WidgetFrame} from '../frames/widget'
import {ChatFrame} from "../frames/chat";
import {UiStore} from "../store/ui";
import img from './assets/front-page-header-desktop.png'

const useStyles = makeStyles(() => ({
    root: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundColor: '#f1f4f8',
        position: 'relative',
        background: `#000 url('${img}') no-repeat`,
    },
    chatPopup: {
        width: ({fullWidth}) => fullWidth ? '100%' : '50vh',
        height: '70vh',
        position: 'fixed',
        bottom: '14vh',
        right: ({fullWidth}) => fullWidth ? '0' : '4vh',
        zIndex: ({opened}) => opened ? 2147483645 : -1,
    },
    widget: {
        zIndex: 2147483646,
        position: 'fixed',
        right: '4vh',
        bottom: '4vh',
        height: '9vh',
        margin: 'auto',
        width: '9vh',
    },
    matchSmallDevice: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Layout = observer(() => {

    const classes = useStyles({opened: UiStore.opened, fullWidth: isMobile});

    return (
        <Grid className={classes.root} container alignItems="flex-end" justify="flex-end">
            <Grid item className={Classnames(classes.chatPopup, classes.matchSmallDevice)}>
                <ChatFrame/>
            </Grid>
            <Grid item className={classes.widget}>
                <WidgetFrame/>
            </Grid>
        </Grid>
    )

})

export default Layout;