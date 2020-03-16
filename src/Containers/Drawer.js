import React from 'react';
import Media from 'react-media';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import * as actions from '../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../Style';
import { GiEntryDoor } from "react-icons/gi";

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.authLogout());

  const isAuth = useSelector(state => { return state.auth.isAuth })

  let authLinks;

  if(!isAuth) {
    authLinks = (
      <List>
        <NavLink to='/' exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Strona główna'} />
          </ListItem>
        </NavLink>
        <NavLink to='/login' exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Zaloguj się'} />
          </ListItem>
        </NavLink>
        <NavLink to='/signup' exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Załóż konto'} />
          </ListItem>
        </NavLink>
      </List>
    )
  } else {
    authLinks = (
      <List>
        <NavLink to='/' exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Strona główna'} />
          </ListItem>
        </NavLink>
        <NavLink to='/new-wallet' exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary={'Nowy portfel'} />
          </ListItem>
        </NavLink>
        <NavLink to={{pathname: '/my-wallets', title: 'Lista dostępnych portfeli'}} exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
        <ListItem button key='Lista portfeli'>
          <ListItemIcon><FormatListNumberedIcon/></ListItemIcon>
          <ListItemText primary={'Lista portfeli'} />
        </ListItem>
        </NavLink>
        <NavLink to={{pathname: '/favourites', title: 'Ulubione'}} exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
        <ListItem button key='Ulubionei'>
          <ListItemIcon><StarIcon/></ListItemIcon>
          <ListItemText primary={'Ulubione'} />
        </ListItem>
        </NavLink>
        <NavLink to={{pathname: '/wallet-settings', title: 'Ustawienia'}} exact activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
        <ListItem button key='Ustawienia'>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={'Ustawienia'} />
        </ListItem>
        </NavLink>
        <NavLink to='#' onClick={onLogout} activeClassName='active' style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem button key='Nowy portfel'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Wyloguj się'} />
          </ListItem>
        </NavLink>
      </List>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1199px)",
          large: "(min-width: 1200px)"
        }}>
        {matches => (
        <Drawer
          variant={matches.small ? 'persistent' : 'permanent'}
          className={
            clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
          open={props.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={props.DrawerClosed}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          {authLinks}
        </Drawer>
        )}
      </Media>
    </React.Fragment>
  );
}