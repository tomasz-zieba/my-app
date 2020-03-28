import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';


function AllOperations({ match, location }) {
  const dispatch = useDispatch();
  const onSendWalletRequest = (walletId) => dispatch(actions.onSendWalletRequest(walletId));

  const incomes = useSelector((state) => state.wallet.incomes);
  const expenses = useSelector((state) => state.wallet.expenses);

  useEffect(() => {
    if (incomes.length === 0 || expenses.length === 0) {
      onSendWalletRequest(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  let operations; let
    label;
  if (location.hash === '#expenses') {
    operations = expenses;
    label = 'Wypłaty';
  } else if (location.hash === '#incomes') {
    operations = incomes;
    label = 'Wpłaty do portfela';
  }

  return (
    <>
      <LatestOperations operations={operations} label={label} buttonmore="false" />
    </>
  );
}

export default withRouter(AllOperations);

AllOperations.propTypes = {
  location: PropTypes.objectOf((PropTypes.any)).isRequired,
  match: PropTypes.objectOf((PropTypes.any)).isRequired,
};
