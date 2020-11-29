import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Login from '../Components/Login'
import Logo from '../Components/Logo'
import FadeIn from 'react-fade-in';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex", 
        flexDirection: "row", 
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url(https://coolbackgrounds.io/images/backgrounds/white/white-contour-c990a61f.svg)", 
        backgroundSize: "cover"
    },
    logo: {
        display: "flex"
    },
    login: {
        paddingTop: "12%", 
        paddingLeft: "15%", 
        marginRight: "50px", 
        width: "100%"
    }
}))

export default function SignupPage() {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = "Custos | Login Page";
      }, []);

    return (
        <div className={classes.root} >
            <FadeIn transitionDuration={1000}>
                <div className={classes.logo}><Logo></Logo></div>
            </FadeIn>
            
            <div className={classes.login} ><Login></Login></div>
        </div>
    )
}