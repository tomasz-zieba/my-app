import React, {useState} from 'react';
import { useDispatch} from 'react-redux';

import * as actions from '../../store/actions/index';

import useStyles from '../../Style';
import StandardTextField from '../../Components/TextField';
import Button from '@material-ui/core/Button';

function Login () {

    const classes = useStyles();

    const [loginUserName, setLoginUserName] = useState('')
    const [loginUserPassword, setLoginUserPassword] = useState('')

    const dispatch = useDispatch();
    const onLoading = (event, authData) => dispatch(actions.authLogin(event, authData));

    return (
        <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                <form
                    onSubmit={ e => onLoading(e, {
                        name: loginUserName,
                        password: loginUserPassword
                        })
                    }
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
      </React.Fragment>
    )
};

export default Login;