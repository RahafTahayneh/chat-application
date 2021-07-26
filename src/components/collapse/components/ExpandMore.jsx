import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Classnames from 'classnames';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        color: '#222',
        paddingLeft: theme.spacing(0.5),
        marginBottom: `-${theme.spacing(0.8)}`,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
            backgroundColor: 'unset !important',
        },
    },
    icon: {
        fontSize: 22,
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    arrow: {
        fontSize: 16,
    },
    filled: {
        width: '100%',
        border: 'solid 2px #000',
        height: '100%',
        padding: 'unset',
    },
}));

const ExpandMore = ({ expanded, onClick, filled }) => {
    const classes = useStyles();
    return (
        <IconButton
            className={Classnames(classes.expand, {
                [classes.expandOpen]: !expanded,
            }, { [classes.filled]: filled })}
            onClick={onClick}
            aria-expanded={expanded}
            aria-label="show more"
        >
            {
                !filled ? <ExpandMoreIcon className={classes.icon} /> : <ArrowDropDownIcon className={classes.arrow} />
            }
        </IconButton>

    );
};

export default ExpandMore;
