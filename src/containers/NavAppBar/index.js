import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        EFO Term Requests
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link} to="/about">
                        About
                    </Button>
                    <Button
                        color="inherit"
                        component={Link} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
