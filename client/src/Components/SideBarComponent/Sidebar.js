import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import largeIcon from '../../assets/logo-2.png';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import WarningIcon from '@material-ui/icons/Warning';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    image: {
      flex: 1,
      width: "100%",
      height: "10%",
      resizeMode: 'contain',
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
    link: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    active: {
      color: "#d4af37",
    }
  }));

export default function Sidebar(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
  
    const handleDrawer = () => {
        setOpen(!open);
    };

    const { pathname } = useLocation();

    const menuContent = [
                            {text: "Data", icon: <EqualizerIcon></EqualizerIcon>, path: "/data"},
                            {text: "Alerts", icon: <WarningIcon></WarningIcon>, path: "/alerts"},
                            {text: "Statistics", icon: <TrendingUpIcon></TrendingUpIcon>, path: "/stat"},
                            {text: "Profile", icon: <AccountCircleIcon></AccountCircleIcon>, path: "/profile"}
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
                    <NavLink to="/data"><img className={classes.image} alt="Custos" src={  largeIcon } ></img></NavLink> 
                </ListItem>
                <IconButton onClick={handleDrawer}>
                { !open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
            { menuContent.map(each => (
                <NavLink className={classes.link} to={each.path} activeClassName={classes.active}>
                  <ListItem button key={each.text}>
                    <ListItemIcon className={pathname.includes(each.path) ? classes.active: ""}> {each.icon} </ListItemIcon>
                    <ListItemText primary={each.text} />
                  </ListItem>
                </NavLink>

            ))}
            </List>
        </Drawer>
        <div>
            {props.children}
        </div>
        </div>
    );
}