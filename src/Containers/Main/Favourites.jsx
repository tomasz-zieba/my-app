import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useStyles from '../../Style';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card';
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import * as actions from '../../store/actions/index';

function Favourites({ history }) {
  const classes = useStyles();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [walletRemoveKey, setWalletRemoveKey] = useState('');

  const dispatch = useDispatch();
  const onSendWalletsRequest = () => dispatch(actions.onSendWalletsRequest());
  const onWalletRemove = (walletId) => dispatch(actions.onWalletRemove(walletId));
  const onInfoELementClose = () => dispatch(actions.onInfoELementClose());
  const onInfoDialogClosed = () => dispatch(actions.onInfoDialogClosed());
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
    // eslint-disable-next-line
  }, []);

  const removeHandler = (key) => {
    setWalletRemoveKey(key);
    setConfirmationDialogOpen(true);
  };

  const confirmationDialogConfirm = () => {
    onWalletRemove(walletRemoveKey);
    setWalletRemoveKey('');
    setConfirmationDialogOpen(false);
  };

  const confirmationDialogCancel = () => {
    setWalletRemoveKey('');
    setConfirmationDialogOpen(false);
  };

  const InfoELementClose = () => {
    onInfoDialogClosed();
    history.push('/');
  };

  const onWalletOpen = (walletKey, walletName) => {
    history.push({ pathname: `/wallet/${walletKey}`, title: walletName });
  };

  let MyWalletsList;
  if (myWallets === undefined) {
    MyWalletsList = <Loader />;
  } else {
    const favouritesWalletsList = myWallets.filter((wallet) => wallet.isFavourite === true);

    if (favouritesWalletsList.length === 0) {
      MyWalletsList = (
        <div className={classes.info}>
          Lista ulubionych jest pusta
          <span className={classes.infoSpan} />
        </div>
      );
    } else {
      MyWalletsList = favouritesWalletsList.map((item) => {
        const startDate = item.startDate.split('T')[0];
        const endDate = item.endDate.split('T')[0];
        return (
          <Card
            open={() => onWalletOpen(item.walletId, item.walletName)}
            onRemove={() => removeHandler(item.walletId)}
            favouritesToggle={() => onRemoveFromFavourites(item.walletId)}
            favouritesButtonText="Usuń z ulubionych"
            isFavourite="true"
            key={item.walletId}
            walletKey={item.walletId}
            name={item.walletName}
            endDate={endDate}
            startDate={startDate}
          />
        );
      });
    }
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

export default Favourites;

Favourites.propTypes = {
  history: PropTypes.objectOf((PropTypes.any)).isRequired,
};
