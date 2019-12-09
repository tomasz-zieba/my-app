import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-wallets';
import useStyles from '../../Style';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card'
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import * as actions from '../../store/actions/index';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

function MyWallets (props) {
    const classes = useStyles();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [walletRemoveKey, setWalletRemoveKey] = useState('');

    const errorInfo = {
        label: 'Ups! Coś poszło nie tak.',
        paragraph: 'Wystąpił problem z połączeniem z serwerem. Spróbuj ponownie później.',
        buttonText : 'Przejdź na stronę główną'
    }
    
    const confirmationInfo = {
        label: 'Czy jesteś pewien, że chcesz usunąć ten portfel?',
        paragraph: 'Po usunięciu portfela dane zostaną bezpowrotnie utracone',
        buttonText : 'Usuń portfel',
        buttonCancel: 'Anuluj'
    }

    useEffect(() => {
        props.onSendWalletsRequest();
    }, []);

    const onWalletRemove = (key) => {
        setWalletRemoveKey(key);
        setConfirmationDialogOpen(true);
    }

    const confirmationDialogConfirm = (key) => {
        props.onWalletRemove(walletRemoveKey)
        setWalletRemoveKey('');
        setConfirmationDialogOpen(false);
    }

    const confirmationDialogCancel = (key) => {
        setWalletRemoveKey('');
        setConfirmationDialogOpen(false);
    }

    const InfoELementClose = () => {
        props.onInfoDialogClosed();
        props.history.push('/');
    }

    const onWalletOpen = (walletKey, walletName) => {
        props.history.push({pathname:'/wallet/' + walletKey, title: walletName});
    }

    const addToFavourites = (key) => {
        props.onAddToFavourites(key);
    }
    const removeFromFavourites = (key) => {
        props.onRemoveFromFavourites(key);
    }

    let MyWalletsList;
    if(props.myWallets === undefined) {
        MyWalletsList = <Loader />
    } else {
        MyWalletsList = props.myWallets.map(item => {
            if (item.favourites !== undefined) {
                return (
                    <Card 
                        open={() => onWalletOpen(item.key, item.walletName)} 
                        onRemove={() => onWalletRemove(item.key)} 
                        favouritesToggle = {() => removeFromFavourites(item.key)}
                        favouritesButtonText = {'Usuń z ulubionych'}
                        favouritesIcon={<StarIcon />}
                        key={item.key} 
                        walletKey={item.key} 
                        name={item.walletName} 
                        endDate={item.endDate} 
                        startDate={item.startDate} />
                    );
            } else {
                return (
                    <Card 
                        open={() => onWalletOpen(item.key, item.walletName)} 
                        onRemove={() => onWalletRemove(item.key)} 
                        favouritesToggle = {() => addToFavourites(item.key)}
                        favouritesButtonText = {'Dodaj do ulubionych'}
                        favouritesIcon={<StarBorderIcon />}
                        key={item.key} 
                        walletKey={item.key} 
                        name={item.walletName} 
                        endDate={item.endDate} 
                        startDate={item.startDate} />
                );
            }
        });
    }

    return (
      <React.Fragment>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {MyWalletsList}
            </div>
            <InfoDialog open={props.infoDialogOpen} text={errorInfo} handleClose={InfoELementClose}/>
            <InfoDialog open={confirmationDialogOpen} text={confirmationInfo} handleClose={confirmationDialogConfirm} handleCancel={confirmationDialogCancel}/>
            <Snackbars open={props.infoElementOpen} variant={props.infoElementVariant} message={props.infoElementText} onClose={props.onInfoELementClose}/>
      </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        myWallets: state.myWallets.myWallets,
        infoElementOpen: state.settings.infoElementOpen,
        infoElementText: state.settings.infoElementText,
        infoElementVariant: state.settings.infoElementVariant,
        infoDialogOpen: state.settings.infoDialogOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendWalletsRequest: () => dispatch(actions.onSendWalletsRequest()),
        onWalletRemove: (walletId) => dispatch(actions.onWalletRemove(walletId)),
        onInfoELementClose: () => dispatch(actions.onInfoELementClose()),
        onInfoDialogClosed: () => dispatch(actions.onInfoDialogClosed()),
        onAddToFavourites: (walledId) => dispatch(actions.onAddToFavourites(walledId)),
        onRemoveFromFavourites: (walledId) => dispatch(actions.onRemoveFromFavourites(walledId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWallets, axios);