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

export default function Login() {
    const classes = useStyles();
    const emailRef = React.useRef();
    const passRef = React.useRef();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const {login} = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
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

                <Grid container alignItems="center" justify="space-between">

                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember Me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">
                            <NavLink className={classes.link} to="/signup"> Need an account? Sign up!</NavLink>
                        </Button>
                        
                    </Grid>
                </Grid>
                
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button disabled={loading} variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleSubmit}>Log In</Button>
                </Grid>

            </div>
        </Paper>
    )
}
