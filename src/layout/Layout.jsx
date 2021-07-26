import React from 'react';
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=> ({
    root:{

    }
}));

const Dashboard = ()=>{
    const classes = useStyles();
    return (
        <Grid item className={classes.root}/>
    )
}

export default Dashboard;