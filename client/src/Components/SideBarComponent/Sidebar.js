import React from 'react';
import clsx from 'clsx';
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import largeIcon from '../../assets/logo-2.png';
import smallIcon from '../../assets/logo.png';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import WarningIcon from '@material-ui/icons/Warning';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    menuButton: {
        marginRight: 36,
      },
    hide: {
        display: 'none',
      },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
  }));

export default function Sidebar(){
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawer = () => {
        setOpen(!open);
    };

    const menuContent = [
                            {text: "Data", icon: <EqualizerIcon></EqualizerIcon>, path: "/"},
                            {text: "Findings", icon: <SearchIcon></SearchIcon>, path: "/" },
                            {text: "Alerts", icon: <WarningIcon></WarningIcon>, path: "/"},
                            {text: "Statistics", icon: <TrendingUpIcon></TrendingUpIcon>, path: "/"},
                            {text: "Profile", icon: <AccountCircleIcon></AccountCircleIcon>, path: "/"}
                        ]

    return(
        <div className={classes.root}>
            <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
            anchor="left"
        >
            <div className={classes.toolbar}>
                
                <ListItem button >
                    <img style={ {width: '100%' }} alt="Custos" src={  largeIcon } ></img> 
                </ListItem>
                <IconButton onClick={handleDrawer}>
                { !open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
            { menuContent.map(each => (
                <ListItem button key={each.text}>
                <ListItemIcon> {each.icon} </ListItemIcon>
                <ListItemText primary={each.text} />
                </ListItem>
            ))}
            </List>
        </Drawer>
        </div>
    );
}