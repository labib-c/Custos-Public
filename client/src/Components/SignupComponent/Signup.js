import React, {useEffect} from 'react'
import { Paper, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from "../../Context/AuthContext";
import { NavLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: "theme.spacing.unit * 2,"
    },
    padding: {
        width: "90%",
        height: "75%",
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

    useEffect(() => {
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
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <Paper className={classes.padding} variant="outlined">
            {error && <Alert severity="error">{error}</Alert>}
            <h1 style={{textAlign: "center", color: "black"}}>Sign Up</h1>
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
                        autoFocus 
                        required />
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

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField 
                        variant="outlined" 
                        id="passwordConfirm" 
                        inputRef={passConfRef} 
                        label="Password Confirmation" 
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

                <Grid container alignItems="center" justify="flex-end">
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">
                            <NavLink className={classes.link} to="/login">Already have an account? Log In</NavLink>
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button className={classes.button} disabled={loading} variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleSubmit}>Sign Up</Button>
                </Grid>

            </div>
        </Paper>
    )
}
