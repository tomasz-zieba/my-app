import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import useStyles from '../../Style';

import { useSelector } from 'react-redux';


function Main () {

    const isAuth = useSelector(state => { return state.auth.isAuth })

    const classes = useStyles();

    let mainPageGrid;

    if(!isAuth) {
        mainPageGrid = (
            <div className={classes.mainGridWrapper}>
                <Link className={classes.mainGridCellLink} to="/login">
                    <div className={classes.mainGridCell_1}>
                        <ListItemIcon className={classes.mainGridCellIcon}><ExitToAppIcon fontSize="large"/></ListItemIcon>
                        Zaloguj się
                    </div>
                </Link>
                <Link className={classes.mainGridCellLink} to="/signup">
                    <div className={classes.mainGridCell_2}>
                        <ListItemIcon className={classes.mainGridCellIcon}><PersonAddIcon fontSize="large"/></ListItemIcon>
                        Załóż konto
                    </div>
                </Link>
            </div>
        )
    }
    if(isAuth) {
        mainPageGrid = (
            <div className={classes.mainGridWrapper}>
                <Link className={classes.mainGridCellLink} to="/new-wallet">
                    <div className={classes.mainGridCell_1}>
                        <ListItemIcon className={classes.mainGridCellIcon}><AccountBalanceWalletIcon fontSize="large"/></ListItemIcon>
                        Nowy portfel
                    </div>
                </Link>
                <Link className={classes.mainGridCellLink} to="/my-wallets">
                    <div className={classes.mainGridCell_2}>
                        <ListItemIcon className={classes.mainGridCellIcon}><FormatListNumberedIcon fontSize="large"/></ListItemIcon>
                        Lista portfeli
                    </div>
                </Link>
                <Link className={classes.mainGridCellLink} to="/favourites">
                    <div className={classes.mainGridCell_3}>
                        <ListItemIcon className={classes.mainGridCellIcon}><StarIcon fontSize="large"/></ListItemIcon>
                        ulubione
                    </div>
                </Link>
                <Link className={classes.mainGridCellLink} to="/wallet-settings">
                    <div className={classes.mainGridCell_4}>
                        <ListItemIcon className={classes.mainGridCellIcon}><SettingsIcon fontSize="large"/></ListItemIcon>
                        Ustawienia
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <React.Fragment>
            {mainPageGrid}
      </React.Fragment>
    )
};

export default Main;