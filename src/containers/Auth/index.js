import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Paper, CircularProgress, Typography } from '@material-ui/core';
import { withFormik } from 'formik';
import * as actions from '../store/actions/index';

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
    danger: {
        color: '#e60000',
        textTransform: 'uppercase',
    },
}));


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

    const [isSignUpForm, setSignUpForm] = useState(true);

    const switchModeHandler = () => {
        setSignUpForm(!isSignUpForm)

        // Update Formik values to pass isSignUp to Redux action as a value
        props.setValues({
            ...props.values,
            isSignUpForm: !isSignUpForm,
        });
    }

    let form = (
        <form onSubmit={handleSubmit}>
            <Grid item>
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
                {errors.email && touched.email &&
                    <div id="email-error">{errors.email}</div>}
            </Grid>

            <Grid item>
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
                {errors.password && touched.password &&
                    <div id="password-error">{errors.password}</div>}
            </Grid>

            <Grid item style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Button type="submit"> Submit </Button>
            </Grid>
        </form>
    )

    if (props.loading) {
        form = <CircularProgress />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <Typography>
                {props.error.message}
            </Typography>
        )
    }

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid container direction="column" item xs={4}
                className={classes.form}>
                <Paper variant="outlined" square className={classes.paper}>
                    {errorMessage}
                    {form}
                    <Button
                        onClick={(event) => (switchModeHandler(event))}
                        className={classes.danger}>Switch to {isSignUpForm ? 'Signin' : 'Signup'}
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

const Auth = withFormik({
    mapPropsToValues: () => ({ email: '', password: '', isSignUpForm: true }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = "The password must be at least 6 characters long."
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting, resetForm, props }) => {
        setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));

            // Call Redux action creator
            props.onAuth(values.email, values.password, values.isSignUpForm)

            setSubmitting(false);
            // resetForm()
        }, 1000);
    },

    displayName: 'AuthForm',
})(MyForm);


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpForm) => dispatch(actions.auth(email, password, isSignUpForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
