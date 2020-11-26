import React from 'react'
import {useAuth} from '../Context/AuthContext'
import {Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card'

export default function ProfileCard() {
    const {currentUser, logout} = useAuth();
    const [error, setError] = React.useState('')
    const userEmail = JSON.stringify(currentUser.email).replace(/"/g, "")
    const userName = "Test Account"
    async function handleLogout(e) {
        try {
            setError('')
            logout()
        } catch(err){
            setError(err.message)
        }
    }
    return (
        <div style={{margin: "40px"}}>
            {error && <Alert severity="error"> {error} </Alert>}
            <Card style={{padding: "40px", height: "100%", width: "100%"}} variant="outlined">
                <div style={{display: "flex"}}>
                    <Avatar >{userEmail.slice(0,1).toUpperCase()}</Avatar>
                    <h2 style={{marginLeft: "20px", marginTop: "5px"}}>{userName}</h2>
                </div>
                <div style={{display: "flex"}}>
                    <h3>Email: </h3> 
                    <p style={{marginLeft: "20px", marginTop: "21px"}}>{userEmail}</p>
                </div>
            </Card>
            <div style={{marginTop: "40px"}}>
                <Button variant="outlined" onClick={handleLogout}> Log Out </Button>
            </div>
        </div>
    )
}
