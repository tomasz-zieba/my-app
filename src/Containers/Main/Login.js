import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';

import * as actions from '../../store/actions/index';
import Snackbars from '../../Components/SnackBar';

import useStyles from '../../Style';
import StandardTextField from '../../Components/TextField';
import Button from '@material-ui/core/Button';

function Login () {

    const classes = useStyles();

    const [loginUserName, setLoginUserName] = useState('')
    const [loginUserPassword, setLoginUserPassword] = useState('')

    const dispatch = useDispatch();
    const onLoading = (event, authData) => dispatch(actions.authLogin(event, authData));
    const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));
    const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));

    const infoElementOpen = useSelector(state => { return state.settings.infoElementOpen });
    const infoElementText = useSelector(state => { return state.settings.infoElementText });
    const infoElementVariant = useSelector(state => { return state.settings.infoElementVariant });

    const loginSubmit = (event) => {
        event.preventDefault();
        if(loginUserName.length < 5) {
            onInfoELementOpen('error', 'User name should be minimum 5 characters long.')
            return false;
        }
        onLoading(event, {
            name: loginUserName,
            password: loginUserPassword
            })
    }

    return (
        <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                <form
                    onSubmit={loginSubmit}
                    style={{width: '251px', margin: '20px'}}
                >
                    <StandardTextField label="Imię" changed={(event) => setLoginUserName(event.target.value)} value={loginUserName}/>
                    <StandardTextField type="password" label="Hasło" changed={(event) => setLoginUserPassword(event.target.value)} value={loginUserPassword}/>
                    <Button 
                        style={{width: '100%', marginTop: '30px'}} 
                        type="submit"
                        variant="contained" 
                        size="large" 
                        color="primary"
                        className={classes.margin}
                    >Zaloguj się</Button>
                </form>
            </div>
            <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose}/>
      </React.Fragment>
    )
};

export default Login;