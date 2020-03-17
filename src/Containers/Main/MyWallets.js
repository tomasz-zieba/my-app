import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card'
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import * as actions from '../../store/actions/index';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { GiConsoleController } from 'react-icons/gi';

function MyWallets (props) {

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [walletRemoveKey, setWalletRemoveKey] = useState('');

    const dispatch = useDispatch();
    const onSendWalletsRequest = () => dispatch(actions.onSendWalletsRequest());
    const onWalletRemove = (walletId) => dispatch(actions.onWalletRemove(walletId));
    const onInfoELementClose = () => dispatch(actions.onInfoELementClose());
    const onInfoDialogClosed = () => dispatch(actions.onInfoDialogClosed());
    const onAddToFavourites = (walledId) => dispatch(actions.onAddToFavourites(walledId));
    const onRemoveFromFavourites = (walledId) => dispatch(actions.onRemoveFromFavourites(walledId));
    
    const myWallets = useSelector(state => { return state.myWallets.myWallets });
    const infoElementOpen = useSelector(state => { return state.settings.infoElementOpen });
    const infoElementText = useSelector(state => { return state.settings.infoElementText });
    const infoElementVariant = useSelector(state => { return state.settings.infoElementVariant });
    const infoDialogOpen = useSelector(state => { return state.settings.infoDialogOpen });

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
        onSendWalletsRequest();
    }, []);

    const WalletRemove = (key) => {
        setWalletRemoveKey(key);
        setConfirmationDialogOpen(true);
    }

    const confirmationDialogConfirm = (key) => {
        onWalletRemove(walletRemoveKey)
        setWalletRemoveKey('');
        setConfirmationDialogOpen(false);
    }

    const confirmationDialogCancel = (key) => {
        setWalletRemoveKey('');
        setConfirmationDialogOpen(false);
    }

    const InfoELementClose = () => {
        onInfoDialogClosed();
        props.history.push('/');
    }

    const onWalletOpen = (walletId, walletName) => {
        props.history.push({pathname:'/wallet/' + walletId, title: walletName});
    }

    let MyWalletsList;
    if(myWallets === undefined) {
        MyWalletsList = <Loader />
    } else {
        MyWalletsList = myWallets.map(item => {
            if (item.favourites !== undefined) {
                return (
                    <Card 
                        open={() => onWalletOpen(item.walletId, item.walletName)} 
                        onRemove={() => WalletRemove(item.key)} 
                        favouritesToggle = {() => onRemoveFromFavourites(item.walletId)}
                        favouritesButtonText = {'Usuń z ulubionych'}
                        favouritesIcon={<StarIcon />}
                        key={item.walletId} 
                        walletKey={item.walletId} 
                        name={item.walletName} 
                        endDate={item.endDate} 
                        startDate={item.startDate} />
                    );
            } else {
                return (
                    <Card 
                        open={() => onWalletOpen(item.walletId, item.walletName)} 
                        onRemove={() => WalletRemove(item.walletId)} 
                        favouritesToggle = {() => onAddToFavourites(item.walletId)}
                        favouritesButtonText = {'Dodaj do ulubionych'}
                        favouritesIcon={<StarBorderIcon />}
                        key={item.walletId} 
                        walletKey={item.walletId} 
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
            <InfoDialog open={infoDialogOpen} text={errorInfo} handleClose={InfoELementClose}/>
            <InfoDialog open={confirmationDialogOpen} text={confirmationInfo} handleClose={confirmationDialogConfirm} handleCancel={confirmationDialogCancel}/>
            <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose}/>
      </React.Fragment>
    )
}

export default MyWallets;