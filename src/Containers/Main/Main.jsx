import React from 'react';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useSelector } from 'react-redux';
import useStyles from '../../Style';


function Main() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const classes = useStyles();

  let mainPageGrid;

  if (!isAuth) {
    mainPageGrid = (
      <div className={classes.mainGridWrapper}>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/login', title: 'Logowanie' }}>
          <div className={classes.mainGridCell_1}>
            <ListItemIcon className={classes.mainGridCellIcon}><ExitToAppIcon fontSize="large" /></ListItemIcon>
            Zaloguj się
          </div>
        </Link>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/signup', title: 'Nowe konto' }}>
          <div className={classes.mainGridCell_2}>
            <ListItemIcon className={classes.mainGridCellIcon}><PersonAddIcon fontSize="large" /></ListItemIcon>
            Załóż konto
          </div>
        </Link>
      </div>
    );
  }
  if (isAuth) {
    mainPageGrid = (
      <div className={classes.mainGridWrapper}>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/new-wallet', title: 'Nowy portfel' }}>
          <div className={classes.mainGridCell_1}>
            <ListItemIcon className={classes.mainGridCellIcon}><AccountBalanceWalletIcon fontSize="large" /></ListItemIcon>
            Nowy portfel
          </div>
        </Link>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/my-wallets', title: 'Lista dostępnych portfeli' }}>
          <div className={classes.mainGridCell_2}>
            <ListItemIcon className={classes.mainGridCellIcon}><FormatListNumberedIcon fontSize="large" /></ListItemIcon>
            Lista portfeli
          </div>
        </Link>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/favourites', title: 'Ulubione' }}>
          <div className={classes.mainGridCell_3}>
            <ListItemIcon className={classes.mainGridCellIcon}><StarIcon fontSize="large" /></ListItemIcon>
            ulubione
          </div>
        </Link>
        <Link className={classes.mainGridCellLink} to={{ pathname: '/wallet-settings', title: 'Ustawienia' }}>
          <div className={classes.mainGridCell_4}>
            <ListItemIcon className={classes.mainGridCellIcon}><SettingsIcon fontSize="large" /></ListItemIcon>
            Ustawienia
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      {mainPageGrid}
    </>
  );
}

export default Main;
