import React from 'react';
import { makeStyles, Grid } from "@material-ui/core";
import {observer} from "mobx-react";
import {CollapsableSection} from "../../collapse";
import UserProfile from "./UserProfile";

const useStyles = makeStyles(()=> ({
    root:{
        width: '100%',
        height: '100%'
    },
    leftSide:{

    }
}));

const MessagesContainer = observer(()=> {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid container direction={'row'} justify={'space-between'} className={classes.root}>
            <Grid item>

            </Grid>
            <Grid item>
                <CollapsableSection className={classes.leftSide}>
                    <UserProfile />
                </CollapsableSection>
            </Grid>
        </Grid>
    )
});

export default MessagesContainer;