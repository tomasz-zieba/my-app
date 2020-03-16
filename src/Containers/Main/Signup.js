import React, {useState} from 'react';
import { useDispatch} from 'react-redux';

import * as actions from '../../store/actions/index';

import useStyles from '../../Style';
import StandardTextField from '../../Components/TextField';
import Button from '@material-ui/core/Button';
import Snackbars from '../../Components/SnackBar';

function Main () {

    const classes = useStyles();

    const [signinUserName, setSigninUserName] = useState('')
    const [signinUserPassword, setSigninUserPassword] = useState('')
    const [signinUserPasswordConfirmed, setSigninUserPasswordConfirmed] = useState('')

    const dispatch = useDispatch();
    const onSignup = (event, authData) => dispatch(actions.authSignup(event, authData));

    const onSignupValidator = (event, authData) => {
        event.preventDefault();
        if(authData.name.length < 5) {
            alert('Długość nazwy użytkownka powinna składać się z minimum 5 znaków.');
            return false;
        }
        if (authData.password !== authData.confirmedPassword || authData.password.length < 5) {
            alert('Niepoprawne hasło.');
            return false;
        }
        onSignup(event, authData);
    };

    return (
        <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                <form
                    onSubmit={ e => onSignupValidator(e, {
                        name: signinUserName,
                        password: signinUserPassword,
                        confirmedPassword: signinUserPasswordConfirmed
                        })
                    }
                    style={{width: '251px', margin: '20px'}}
                >
                    <StandardTextField label="Imię (min. 5 znaków)" changed={(event) => setSigninUserName(event.target.value)} value={signinUserName}/>
                    <StandardTextField label="Hasło (min. 5 znaków)" type="password" changed={(event) => setSigninUserPassword(event.target.value)} value={signinUserPassword}/>
                    <StandardTextField label="Potwierdź hasło" type="password" changed={(event) => setSigninUserPasswordConfirmed(event.target.value)} value={signinUserPasswordConfirmed}/>
                    <Button 
                        style={{width: '100%', marginTop: '30px'}} 
                        type="submit" 
                        variant="contained"
                        size="large" 
                        color="primary"
                        className={classes.margin}
                    >Zarejestruj się</Button>
                </form>
            </div>
      </React.Fragment>
    )
};

export default Main;