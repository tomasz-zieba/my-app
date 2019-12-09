import React, { useState } from "react";
import Media from 'react-media';
import {Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router";

import useStyles from './Style';
import Header from './Containers/Header';
import MiniDrawer from './Containers/Drawer';
import NewWallet from './Containers/Main/NewWallet';
import MyWallets from './Containers/Main/MyWallets';
import Favourites from './Containers/Main/Favourites'
import Wallet from './Containers/Main/Wallet';
import Settings from './Containers/Main/Settings'
import AllOperations from './Containers/Main/AllOperations';

function App (props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            
                <Header text={props.history.location.title} open={open} DrawerOpen={handleDrawerOpen}/>
                <MiniDrawer open={open} DrawerClosed={handleDrawerClose} />
                <Media queries={{small: "(max-width: 599px)"}}>
                {matches => (
                <main className={classes.content} style={matches.small && !open ? {marginLeft: '-57px'} : null}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/" exact component={NewWallet} /> 
                        <Route path="/my-wallets" component={MyWallets} />
                        <Route path="/favourites" component={Favourites} />
                        <Route path="/wallet/:id/all_operations" component={AllOperations} />
                        <Route path="/wallet/:id" component={Wallet} />
                        <Route path="/wallet-settings" component={Settings} />
                    </Switch>
                </main>
                )}
                </Media>
        </div>
    )
}

export default withRouter(App);