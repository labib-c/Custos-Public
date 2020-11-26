import React from 'react'
import largeIcon from '../assets/logo-2.png';
import { Typography, Box } from '@material-ui/core';

export default function Logo() {
    return (
        <div>
            <Box style={{ height: "40%", width: "10%"}}><img style={{height: "650px", width: "650px"}} alt="Custos" src={ largeIcon }></img></Box>
            <Typography gutterBottom variant="h3">
                <Box style={{paddingLeft: "6%", width: "100%"}} fontWeight="fontWeightBold">
                Cybersecurity That <div style={{color: "#d4af37"}}> Makes Sense.</div>
                </Box>
                
            </Typography>
        </div>
    )
}
