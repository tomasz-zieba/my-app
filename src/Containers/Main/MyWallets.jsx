import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card';
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import * as actions from '../../store/actions/index';

function MyWallets(props) {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [walletRemoveKey, setWalletRemoveKey] = useState('');

  const dispatch = useDispatch();
  const onSendWalletsRequest = () => dispatch(actions.onSendWalletsRequest());
  const onWalletRemove = (walletId) => dispatch(actions.onWalletRemove(walletId));
  const onInfoELementClose = () => dispatch(actions.onInfoELementClose());
  const onInfoDialogClosed = () => dispatch(actions.onInfoDialogClosed());
  const onAddToFavourites = (walledId) => dispatch(actions.onAddToFavourites(walledId));
  const onRemoveFromFavourites = (walledId) => dispatch(actions.onRemoveFromFavourites(walledId));

  const myWallets = useSelector((state) => state.myWallets.myWallets);
  const infoElementOpen = useSelector((state) => state.settings.infoElementOpen);
  const infoElementText = useSelector((state) => state.settings.infoElementText);
  const infoElementVariant = useSelector((state) => state.settings.infoElementVariant);
  const infoDialogOpen = useSelector((state) => state.settings.infoDialogOpen);
  const requestSended = useSelector((state) => state.settings.requestSended);

  const errorInfo = {
    label: 'Ups! Coś poszło nie tak.',
    paragraph: 'Wystąpił problem z połączeniem z serwerem. Spróbuj ponownie później.',
    buttonText: 'Przejdź na stronę główną',
  };

  const confirmationInfo = {
    label: 'Czy jesteś pewien, że chcesz usunąć ten portfel?',
    paragraph: 'Po usunięciu portfela dane zostaną bezpowrotnie utracone',
    buttonText: 'Usuń portfel',
    buttonCancel: 'Anuluj',
  };

  useEffect(() => {
    onSendWalletsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const WalletRemove = (key) => {
    setWalletRemoveKey(key);
    setConfirmationDialogOpen(true);
  };

  const confirmationDialogConfirm = (key) => {
    onWalletRemove(walletRemoveKey);
    setWalletRemoveKey('');
    setConfirmationDialogOpen(false);
  };

  const confirmationDialogCancel = (key) => {
    setWalletRemoveKey('');
    setConfirmationDialogOpen(false);
  };

  const InfoELementClose = () => {
    onInfoDialogClosed();
    props.history.push('/');
  };

  const onWalletOpen = (walletId, walletName) => {
    props.history.push({ pathname: `/wallet/${walletId}`, title: walletName });
  };

  let MyWalletsList;
  if (myWallets !== undefined) {
    MyWalletsList = myWallets.map((item) => {
      const startDate = item.startDate.split('T')[0];
      const endDate = item.endDate.split('T')[0];
      if (item.isFavourite === true) {
        return (
          <Card
            open={() => onWalletOpen(item.walletId, item.walletName)}
            onRemove={() => WalletRemove(item.key)}
            favouritesToggle={() => onRemoveFromFavourites(item.walletId)}
            favouritesButtonText="Usuń z ulubionych"
            favouritesIcon={<StarIcon />}
            key={item.walletId}
            walletKey={item.walletId}
            name={item.walletName}
            endDate={endDate}
            startDate={startDate}
          />
        );
      }
      return (
        <Card
          open={() => onWalletOpen(item.walletId, item.walletName)}
          onRemove={() => WalletRemove(item.walletId)}
          favouritesToggle={() => onAddToFavourites(item.walletId)}
          favouritesButtonText="Dodaj do ulubionych"
          favouritesIcon={<StarBorderIcon />}
          key={item.walletId}
          walletKey={item.walletId}
          name={item.walletName}
          endDate={endDate}
          startDate={startDate}
        />
      );
    });
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {MyWalletsList}
      </div>
      {requestSended ? <Loader /> : ''}
      <InfoDialog
        open={infoDialogOpen}
        text={errorInfo}
        handleClose={InfoELementClose}
      />
      <InfoDialog
        open={confirmationDialogOpen}
        text={confirmationInfo}
        handleClose={confirmationDialogConfirm}
        handleCancel={confirmationDialogCancel}
      />
      <Snackbars
        open={infoElementOpen}
        variant={infoElementVariant}
        message={infoElementText}
        onClose={onInfoELementClose}
      />
    </>
  );
}

export default MyWallets;
