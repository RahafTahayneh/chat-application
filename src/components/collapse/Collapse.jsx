import React from 'react';
import {
    makeStyles, Collapse, Grid,
} from '@material-ui/core';
import Classnames from 'classnames';
import ExpandMore from "./components/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: 'solid 2px #ebebeb',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#222'
    },
}));

const CollapsableSection = ({
                                                 title, className, expand, children,
                                             }) => {
    const [expanded, setExpanded] = React.useState(expand || false);
    const onClick = () => {
        setExpanded(!expanded);
    };
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={Classnames(classes.root, className)}>
            <Grid item spacing={2} container direction="row" alignItems="center" justify="space-between">
                <Grid item md={9} className={classes.title} container alignItems="center" wrap={'nowrap'}>
                    {title}
                    <ExpandMore expanded={expanded} onClick={onClick} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </Grid>
        </Grid>

    );
};

export default CollapsableSection;
