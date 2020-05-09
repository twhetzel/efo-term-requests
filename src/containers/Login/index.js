import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Paper } from '@material-ui/core';
import { withFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 8,
    },
    form: {
        textAlign: "center",
    },
    paper: {
        padding: 32,
        backgroundColor: '#f2f2f2',
    },
    input: {
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: 'beige',
    },
}));


const handleLogin = () => {
    console.log("** Login button pressed")
}


const MyForm = props => {
    const classes = useStyles();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (

        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid item xs={6}
                className={classes.form}>
                <Paper variant="outlined" square className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            value={values.email}
                            name="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            helperText="Add your email"
                            className={classes.input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                                className: classes.textInput
                            }}
                        />
                        {errors.email && touched.email && <div id="feedback">{errors.email}</div>}

                        <TextField
                            value={values.password}
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            helperText="Add your password"
                            className={classes.input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                                className: classes.textInput
                            }}
                        />
                        {errors.password && touched.password && <div id="feedback">{errors.password}</div>}

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Button
                                type="submit"
                                onClick={handleLogin}
                            >
                                Submit
                                </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export const Login = withFormik({
    mapPropsToValues: () => ({ name: '' }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'BasicForm',
})(MyForm);
