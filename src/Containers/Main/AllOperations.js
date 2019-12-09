import React, {useEffect} from 'react';
import useStyles from '../../Style';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';


function AllOperations (props) {

    useEffect(() => {
        if (props.incomes.length === 0 || props.expenses.length === 0){
            props.onSendWalletRequest(props.match.params.id)
        }
    }, []);

    const classes = useStyles();

    let operations, label;
    if(props.location.hash === '#expenses'){
        operations = props.expenses;
        label = 'Wypłaty';
    } else if (props.location.hash === '#incomes') {
        operations = props.incomes;
        label = 'Wpłaty do portfela';
    };

    return (
        <React.Fragment>
            <LatestOperations operations={operations} label={label} buttonmore={'false'}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        incomes: state.wallet.incomes,
        expenses: state.wallet.expenses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendWalletRequest: (walletId) => dispatch(actions.onSendWalletRequest(walletId)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllOperations));