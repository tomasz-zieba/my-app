import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../Style';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card'
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import StarIcon from '@material-ui/icons/Star';
import * as actions from '../../store/actions/index';

function Favourites (props) {

    const classes = useStyles();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [walletRemoveKey, setWalletRemoveKey] = useState('');

    const dispatch = useDispatch();
    const onSendWalletsRequest = () => dispatch(actions.onSendWalletsRequest());
    const onWalletRemove = (walletId) => dispatch(actions.onWalletRemove(walletId));
    const onInfoELementClose = () => dispatch(actions.onInfoELementClose());
    const onInfoDialogClosed = () => dispatch(actions.onInfoDialogClosed());
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
    const noFavouritesWallets = {
        label: 'Brak ulubionych portfeli.',
        paragraph: 'Aby móc wyświetlić stronę dodaj portfel do ulubionych.',
        buttonText : 'Przejdź do listy portfeli'
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

    const removeHandler = (key) => {
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

    const onWalletOpen = (walletKey, walletName) => {
        props.history.push({pathname:'/wallet/' + walletKey, title: walletName});
    }

    let MyWalletsList;
    if(myWallets === undefined) {
        MyWalletsList = <Loader />
    } else {
        const favouritesWalletsList = myWallets.filter(wallet => wallet.isFavourite === true)

        if(favouritesWalletsList.length === 0) {
            MyWalletsList = <div className={classes.info}>Lista ulubionych jest pusta<span className={classes.infoSpan}></span></div>
        } else { 
            MyWalletsList = favouritesWalletsList.map(item => {
                return (
                    <Card 
                        open={() => onWalletOpen(item.walletId, item.walletName)} 
                        onRemove={() => removeHandler(item.walletId)} 
                        favouritesToggle = {() => onRemoveFromFavourites(item.walletId)}
                        favouritesButtonText = {'Usuń z ulubionych'}
                        favouritesIcon={<StarIcon />}
                        key={item.walletId} 
                        walletKey={item.walletId} 
                        name={item.walletName} 
                        endDate={item.endDate} 
                        startDate={item.startDate} />
                    );
            })
        }
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

export default Favourites;