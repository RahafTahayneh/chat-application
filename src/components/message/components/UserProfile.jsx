import React from 'react';
import { makeStyles, Grid, Avatar } from "@material-ui/core";
import {observer} from "mobx-react";
import {UserStore} from "../../../store/user";

const useStyles = makeStyles((theme)=> ({
    root:{
        width: '100%',
        height: '100%',
        padding: theme.spacing(2)
    },
    label:{
        fontSize: 14,
        color: theme.palette.primary.main,
        margin: theme.spacing(2, 0)
    },
    avatar:{
        height: 60,
        width: 60
    }
}));

const UserProfile = observer(()=> {
    const classes = useStyles();

    return (
        <Grid container direction={'column'} alignItems={'flex-start'} className={classes.root}>
            <Grid item className={classes.label}>
                <strong> Name </strong> {`${UserStore.user.firstName} ${UserStore.user.lastName}`}
            </Grid>
            <Grid item className={classes.label}>
                <strong> Age </strong> {UserStore.user.age}
            </Grid>
            <Grid item container justify={'center'} alignItems={'center'}>
                <Avatar src={UserStore.user.avatar} className={classes.avatar} />
            </Grid>
        </Grid>
    )
});

export default UserProfile;