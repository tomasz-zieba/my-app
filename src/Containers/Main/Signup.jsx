import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as actions from '../../store/actions/index';
import Snackbars from '../../Components/SnackBar';
import Loader from '../../Components/Loader';
import useStyles from '../../Style';
import StandardTextField from '../../Components/TextField';

function Main() {
  const classes = useStyles();

  const [signinUserName, setSigninUserName] = useState('');
  const [signinUserPassword, setSigninUserPassword] = useState('');
  const [signinUserPasswordConfirmed, setSigninUserPasswordConfirmed] = useState('');

  const dispatch = useDispatch();
  const onSignup = (event, authData) => dispatch(actions.authSignup(event, authData));
  const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
  const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));

  const infoElementOpen = useSelector((state) => state.settings.infoElementOpen);
  const infoElementText = useSelector((state) => state.settings.infoElementText);
  const infoElementVariant = useSelector((state) => state.settings.infoElementVariant);
  const requestSended = useSelector((state) => state.settings.requestSended);


  const onSignupValidator = (event, authData) => {
    event.preventDefault();
    if (authData.name.length < 5) {
      onInfoELementOpen('error', 'User name should be minimum 5 characters long.');
      return false;
    }
    if (authData.password !== authData.confirmedPassword || authData.password.length < 5) {
      onInfoELementOpen('error', 'Password does not match');
      return false;
    }
    onSignup(event, authData);
    return true;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        <form
          onSubmit={(e) => onSignupValidator(e, {
            name: signinUserName,
            password: signinUserPassword,
            confirmedPassword: signinUserPasswordConfirmed,
          })}
          style={{ width: '251px', margin: '20px' }}
        >
          <StandardTextField label="Imię (min. 5 znaków)" changed={(event) => setSigninUserName(event.target.value)} value={signinUserName} />
          <StandardTextField label="Hasło (min. 5 znaków)" type="password" changed={(event) => setSigninUserPassword(event.target.value)} value={signinUserPassword} />
          <StandardTextField label="Potwierdź hasło" type="password" changed={(event) => setSigninUserPasswordConfirmed(event.target.value)} value={signinUserPasswordConfirmed} />
          <Button
            style={{ width: '100%', marginTop: '30px' }}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Zarejestruj się
          </Button>
        </form>
      </div>
      {requestSended ? <Loader /> : ''}
      <Snackbars
        open={infoElementOpen}
        variant={infoElementVariant}
        message={infoElementText}
        onClose={onInfoELementClose}
      />
    </>
  );
}

export default Main;
