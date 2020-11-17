import React from 'react'
import Sidebar from "./../Components/SideBarComponent/Sidebar";
import {useAuth} from "./../Context/AuthContext"
import {Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function ProfilePage() {
    const {currentUser, logout} = useAuth();
    const [error, setError] = React.useState('')
    async function handleLogout(e) {
        try {
            setError('')
            logout()
        } catch(err){
            setError(err.message)
        }
    }
    return (
        <Sidebar>
            {error && <Alert severity="error"> {error} </Alert>}
            {JSON.stringify(currentUser.email)}
            <div>
                <Button variant="outlined" onClick={handleLogout}> Log Out </Button>
            </div>
        </Sidebar>
    )
}
