import React from 'react'
import { Paper, makeStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from "../../Context/AuthContext";
import { NavLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        width: "50%",
        height: "50%",
        padding: theme.spacing.unit
    },
    link: {
        textDecoration: 'none'
      }
}));

export default function Signup() {
    const classes = useStyles();
    const emailRef = React.useRef();
    const passRef = React.useRef();
    const passConfRef = React.useRef();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const {signup} = useAuth();
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        
        if (passRef.current.value !== passConfRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)

    }
    return (

        <Paper className={classes.padding} variant="outlined">
            {error && <Alert severity="error">{error}</Alert>}
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" inputRef={emailRef} label="Email" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" inputRef={passRef} label="Password" type="password" fullWidth required />
                    </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="passwordConfirm" inputRef={passConfRef} label="Password Confirmation" type="password" fullWidth required />
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justify="flex-end">
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">
                            <NavLink className={classes.link} to="/login">Already have an account? Log In</NavLink>
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button disabled={loading} variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleSubmit}>Sign Up</Button>
                </Grid>

            </div>
        </Paper>
    )
}
