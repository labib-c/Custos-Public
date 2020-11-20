import React from 'react'
import Signup  from '../Components/SignupComponent/Signup'
import Logo from '../Components/LogoComponent/Logo'
import FadeIn from 'react-fade-in';

export default function SignupPage() {
    return (
        <div style={{display: "flex", flexDirection: "row"}} >
            <FadeIn transitionDuration={1000}>
                <div style={{display: "flex"}}><Logo></Logo></div>
            </FadeIn>
            <div style={{paddingTop: "12%", paddingLeft: "15%", marginRight: "50px", width: "100%"}} ><Signup></Signup></div>
        </div>
    )
}
