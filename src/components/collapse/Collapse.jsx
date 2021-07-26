import React from 'react';
import { Grid, makeStyles, Drawer} from '@material-ui/core';
import Classnames from 'classnames';
import ExpandMore from "./components/ExpandMore";
import {useAui} from "../../context";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: 'solid 2px #ebebeb',
        height: '100%'
    },
    icon:{
      height: 'fit-content'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#222'
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

const CollapsableSection = ({
                                className, children,
                            }) => {
    const { container } = useAui();
    const [expanded, setExpanded] = React.useState(false);
    const onClick = () => {
        setExpanded(!expanded);
    };
    const classes = useStyles();

    return (
        <Grid container className={Classnames(classes.root, className)}>
            <Grid item className={classes.icon}>
                <ExpandMore expanded={expanded} onClick={onClick}/>
            </Grid>
            <Grid item>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'right'}
                    open={expanded}
                    onClose={onClick}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <>
                        <Grid item className={classes.icon}>
                            <ExpandMore expanded={expanded} onClick={onClick}/>
                        </Grid>
                        {children}
                    </>
                </Drawer>
            </Grid>
        </Grid>

    );
};

export default CollapsableSection;
