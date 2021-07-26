import React from 'react';
import { Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { QuestionAnswer, Close }  from '@material-ui/icons';

import { UiStore } from "../../store/ui";

const useStyles = makeStyles(()=> ({
    root:{
        cursor: 'pointer',
        height: '100%',
        width: '100%',
    },
    icon:{
      color: '#fff',
      height: '2rem',
      width: '2rem'
    },
    '@global': {
        body: {
            background: 'transparent',
        },
    },
}));

const WidgetContent = observer(()=> {
    const classes = useStyles();

    return (
        <Grid item container alignItems={'center'} justify={'center'} className={classes.root}  onClick={() => (UiStore.opened ? UiStore.close() : UiStore.open())}>
            {
                UiStore.opened?
                    <Close className={classes.icon}/>
                    :
                    <QuestionAnswer className={classes.icon}/>

            }
        </Grid>
    )

});

export default WidgetContent