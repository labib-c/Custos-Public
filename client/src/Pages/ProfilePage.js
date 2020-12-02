import React from 'react'
import Sidebar from "./../Components/Sidebar";
import ProfileCard from "./../Components/ProfileCard"


export default function ProfilePage() {

    React.useEffect(() => {
        document.title = "Custos | Profile Page";
        document.body.style.backgroundColor = "#F4F4F3"
      }, []);

    return (
        <Sidebar>
            <ProfileCard></ProfileCard>
        </Sidebar>
    )
}
