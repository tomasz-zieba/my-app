import React, { useState, useEffect } from "react";
import Media from 'react-media';
import {Route, Switch, Redirect} from 'react-router-dom';
import { withRouter } from "react-router";

import useStyles from './Style';
import Header from './Containers/Header';
import MiniDrawer from './Containers/Drawer';
import Main from './Containers/Main/Main';
import Login from './Containers/Main/Login';
import Signup from './Containers/Main/Signup';
import NewWallet from './Containers/Main/NewWallet';
import MyWallets from './Containers/Main/MyWallets';
import Favourites from './Containers/Main/Favourites'
import Wallet from './Containers/Main/Wallet';
import Settings from './Containers/Main/Settings'
import AllOperations from './Containers/Main/AllOperations';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/index';

function App (props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const onTryAutoSignup = () => dispatch(actions.authCheckState());

    const isAuth = useSelector(state => { return state.auth.isAuth })

    useEffect(() => {
        onTryAutoSignup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const drawerToggle = () => {
        setOpen(!open)
    }

    let routes = (
        <Switch>
            <Route path="/" exact component={Main} /> 
            <Route path="/login" exact component={Login}/> 
            <Route path="/signup" exact component={Signup}/>
        </Switch>
      );
    if ( isAuth ) {
    routes = (
        <Switch>
            <Route path="/" exact component={Main} /> 
            <Route path="/new-wallet" exact component={NewWallet} /> 
            <Route path="/my-wallets" component={MyWallets} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/wallet/:id/all_operations" component={AllOperations} />
            <Route path="/wallet/:id" component={Wallet} />
            <Route path="/wallet-settings" component={Settings} />
            <Redirect to="/" />
        </Switch>
    );
    }
    return (
        <div className={classes.root}>
            
                <Header text={props.history.location.title} open={open} DrawerToggle={drawerToggle}/>
                <MiniDrawer open={open} DrawerToggle={drawerToggle} />
                <Media queries={{small: "(max-width: 599px)"}}>
                {matches => (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {routes}
                </main>
                )}
                </Media>
        </div>
    )
}

export default withRouter(App);