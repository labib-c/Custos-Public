import React from 'react'
import { Paper, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from "../Context/AuthContext";
import { NavLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: "theme.spacing.unit * 2,"
    },
    padding: {
        width: "90%",
        height: "60%",
        padding: "10px",
        borderColor: "#black !important",
        backgroundColor: "#00000000",
        opacity: 0.7
    },
    link: {
        textDecoration: 'none',
        color: "black"
    },

    label: {
        color: "black !important"
    },
    outline: {
        borderWidth: '1px',
        borderColor: 'black !important'
    },
    button: {
        color: "black !important",
        borderColor: "#black !important"
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

    React.useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            handleSubmit(event)
            // callMyFunction();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (

        <Paper className={classes.padding } variant="elevated">
            {error && <Alert severity="error">{error}</Alert>}
            <h1 style={{textAlign: "center", color: "black"}}>Log In</h1>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField 
                        variant="outlined" 
                        id="username" 
                        inputRef={emailRef} 
                        label="Email" 
                        type="email" 
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.label,
                            }
                        }}
                        InputProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.label,
                              notchedOutline: classes.outline,
                            }}}
                        fullWidth 
                        autoFocus required />
                    </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField 
                        variant="outlined"
                        id="password" 
                        inputRef={passRef} 
                        label="Password" 
                        type="password"
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.label,
                            }
                        }}
                        InputProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.label,
                              notchedOutline: classes.outline,
                            }}}
                        fullWidth 
                        required />
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justify="space-between">

                    <Grid item>
                        <Button aria-label="Go to Sign Up Page" disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">
                            <NavLink className={classes.link} to="/signup"> Need an account? Sign up!</NavLink>
                        </Button>
                        
                    </Grid>
                </Grid>
                
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button aria-label="Log In button" className={classes.button} disabled={loading} variant="outlined" style={{ textTransform: "none" }} onClick={handleSubmit}>Log In</Button>
                </Grid>

            </div>
        </Paper>
    )
}
