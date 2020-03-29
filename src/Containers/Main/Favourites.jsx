import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Loader from '../../Components/Loader';
import Card from '../../Components/Card';
import InfoDialog from '../../Components/DialogInfo';
import Snackbars from '../../Components/SnackBar';
import theme from '../../theme';
import * as actions from '../../store/actions/index';

function Favourites({ history }) {
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

  const useStyles = makeStyles({
    walletsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      [theme.breakpoints.down(979)]: {
        justifyContent: 'center',
      },
    },
    info: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '25px',
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: '700',
      lineHeight: '1',
      textTransform: 'uppercase',
    },
    infoSpan: {
      width: '73px',
      height: '4px',
      margin: '8px auto 0',
      display: 'block',
      backgroundColor: '#3f51b5',
    },
  });
  const classes = useStyles();

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
      <div className={classes.walletsWrapper}>
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
