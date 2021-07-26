import React from 'react';
import { makeStyles } from "@material-ui/core";
import { observer } from 'mobx-react';
import { isMobile } from "react-device-detect";
import { FramePortal } from '../../components/framePortal'
import theme from '../../theme';
import ChatContent from './ChatContent'
import {UiStore} from "../../store/ui";

const useStyles = makeStyles(() => ({
    root:({ opened }) => ({
        position: 'relative',
        zIndex: 2147483645,
        backgroundColor: 'transparent',
        width:  isMobile?  '90%' : '100%',
        height: '100%',
        opacity: opened ? 1 : 0,
        transition: `all 1s ease-out`,
    }),
    iframe:{
        height: '100%',
        width: '100%',
    }
}));

const Chat = observer(() => {
    const classes = useStyles({opened: UiStore.opened})
    return(
        <div className={classes.root}>
            <FramePortal
                className={classes.iframe}
                theme={theme}
            >
                <ChatContent />
            </FramePortal>
        </div>
    )

})

export default Chat;