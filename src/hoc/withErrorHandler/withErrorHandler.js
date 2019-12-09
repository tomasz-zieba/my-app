import React, {useState, useEffect}from 'react';
import Snackbar from '../../Components/SnackBar';

const withErrorHandler = (WrappedComponent, axios) => {

    return (props) => {
    const [snackBarOpen, setSnacbarOpen] = useState(false)

    const resInterceptor = axios.interceptors.response.use(res => res, err => {
        setSnacbarOpen(true); 
        return Promise.reject(err);
    })

    useEffect(() => {
        return () => {
            axios.interceptors.response.eject(resInterceptor)
        }
    }, [resInterceptor]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnacbarOpen(false);
    };
        return (
            <React.Fragment>
                <WrappedComponent {...props} />
                <Snackbar open={snackBarOpen} variant={'error'} message={'Wystąpił błąd.'} onClose={handleSnackbarClose}/>
            </React.Fragment>
        );
    };
};

export default withErrorHandler