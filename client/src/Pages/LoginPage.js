import React from 'react'
import Login from '../Components/LoginComponent/Login'
import Logo from '../Components/LogoComponent/Logo'

export default function SignupPage() {
    return (
        <div style={{display: "flex", flexDirection: "row"}} >
            <div style={{display: "flex"}}><Logo></Logo></div>
            <div style={{paddingTop: "12%", paddingLeft: "15%", marginRight: "50px", width: "100%"}} ><Login></Login></div>
            
        </div>
    )
}