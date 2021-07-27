import React from 'react';
import {Grid, makeStyles, Avatar} from "@material-ui/core";
import {observer} from "mobx-react";
import {UserStore} from "../../../store/user";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        color: 'rgb(255, 255, 255)',
        backgroundImage: 'linear-gradient(-225deg, rgb(80, 204, 204) 35%, rgb(69, 174, 202) 100%)',
        borderRadius: '8px 8px 0px 0px'
    },
    name: {
        fontSize: 16,
        fontWeight: 400
    },
    avatar:{
        border: '2px solid rgb(255, 255, 255)',
        height: 40,
        width: 40
    }
}));

const Header = observer(() => {
    const classes = useStyles();
    return (
        <Grid container alignItems={'center'} justify={'space-between'} className={classes.root}>
            <Grid item className={classes.name}>
                Hi <strong> {`${UserStore.user.firstName || 'Guest'}`} </strong>
            </Grid>
            <Grid item>
                <Avatar src={UserStore.user.avatar} className={classes.avatar} />
            </Grid>
        </Grid>
    )
});

export default Header;