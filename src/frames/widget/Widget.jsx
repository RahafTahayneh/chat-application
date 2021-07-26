import React from 'react';
import {makeStyles} from "@material-ui/core";
import {observer} from 'mobx-react';
import {FramePortal} from '../../components/framePortal'
import theme from '../../theme';
import WidgetContent from './WidgetContent'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        backgroundImage: 'linear-gradient(-225deg, rgb(80, 204, 204) 35%, rgb(69, 174, 202) 100%)',
    },
    iframe: {
        height: '100%',
        width: '100%',
    }
}));

const Widget = observer(() => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <FramePortal
                className={classes.iframe}
                theme={theme}
            >
                <WidgetContent/>
            </FramePortal>
        </div>
    )

})

export default Widget;