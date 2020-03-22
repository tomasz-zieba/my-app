import React, {useEffect} from 'react';
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';


function AllOperations (props) {

    const dispatch = useDispatch();
    const onSendWalletRequest = (walletId) => dispatch(actions.onSendWalletRequest(walletId));

    const incomes = useSelector(state => { return state.wallet.incomes });
    const expenses = useSelector(state => { return state.wallet.expenses });

    useEffect(() => {
        if (incomes.length === 0 || expenses.length === 0){
            onSendWalletRequest(props.match.params.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let operations, label;
    if(props.location.hash === '#expenses'){
        operations = expenses;
        label = 'Wypłaty';
    } else if (props.location.hash === '#incomes') {
        operations = incomes;
        label = 'Wpłaty do portfela';
    };

    return (
        <React.Fragment>
            <LatestOperations operations={operations} label={label} buttonmore={'false'}/>
        </React.Fragment>
    )
}

export default withRouter(AllOperations);