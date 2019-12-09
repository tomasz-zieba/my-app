import React, {useState, useEffect} from 'react';
import useStyles from '../../Style';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import WalletForm from '../../Components/walletForm/walletForm';
import axios from '../../axios-wallets';
import * as actions from '../../store/actions/index';
import InfoLabel from '../../Components/InfoLabel';
import Snackbars from '../../Components/SnackBar';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';
import Summary from '../../Components/summary';
import { useTheme } from '@material-ui/styles';

function Wallet(props) {
    const theme = useTheme();
    const [summary, setSummary] = useState([]);
    
    useEffect(() => {
        if (props.incomeCategories.length === 0 || props.expenseCategories.length === 0){
            props.onSendCategoriesRequest();
        }
    }, [])

    useEffect(() => {
        props.onSendWalletRequest(props.match.params.id)
    }, [props.match.params.id]);

    useEffect(() => {
        const colors = [ theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main, theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light, theme.palette.info.light, theme.palette.warning.light, theme.palette.error.light ];
        let categoriesSummary = [];
        let usedCategoriesData = {}
        let expensesSum = 0;
        for (let i=0;props.expenses.length > i; i++) {

            if (!usedCategoriesData.hasOwnProperty(props.expenses[i].category)) {
                usedCategoriesData[props.expenses[i].category] = {
                    title: props.expenses[i].category,
                    value: parseFloat(props.expenses[i].value),
                    color: colors[i]
                }
            } else {
                usedCategoriesData[props.expenses[i].category].value += parseFloat(props.expenses[i].value)
            }
            expensesSum += parseFloat(props.expenses[i].value)
        }
        for (var key in usedCategoriesData) {
            if (usedCategoriesData.hasOwnProperty(key)) {
                const value = usedCategoriesData[key].value
                let percentageValue = ((value* 100)/expensesSum).toFixed(2);
                usedCategoriesData[key].value = percentageValue;
                categoriesSummary.push(usedCategoriesData[key])
            }
        }
        setSummary(categoriesSummary);
    }, [props.expenses]);

    const expenseClickHandler = (expenseData) => {
        props.onSaveExpense(expenseData);
    }
    const incomeClickHandler = (incomeData) => {
        props.onSaveIncome(incomeData)
    }

    const seeAllOperationsHandler = operationsType => () => {
            props.history.push({
                pathname: props.location.pathname + '/all_operations',
                hash: operationsType
            });
    }

    const incomeCategories = [];
    const expenseCategories = [];
    for (let i=0; i < props.incomeCategories.length; i++){
        incomeCategories.push(props.incomeCategories[i].name);
    }
    for (let i=0; i < props.expenseCategories.length; i++){
        expenseCategories.push(props.expenseCategories[i].name);
    }

    const latestIncomes = props.incomes.filter((income, index) => index < 5)
    const latestExpense = props.expenses.filter((expense, index) => index < 5)
    const classes = useStyles();
    return (
        <React.Fragment>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: "space-around"}}>
                <WalletForm 
                    label={'Dodaj nową transakcję'}
                    dateLabel={'Data transakcji: '}
                    categories={expenseCategories}   
                    clickHandler={(data) => expenseClickHandler(data)}
                    walletKey={props.match.params.id}
                    active={props.infoElementOpen}/>
                <div>
                    <InfoLabel value={props.totalIncome} name={'WPŁYWY'}/>
                    <InfoLabel value={props.totalExpense} name={'WYDATKI'}/>
                </div>
                <WalletForm 
                    label={'Zasil konto'}
                    dateLabel={'Data wpływu: '}
                    categories={incomeCategories} 
                    clickHandler={(data) => incomeClickHandler(data)}
                    walletKey={props.match.params.id}
                    active={props.infoElementOpen}/>
            </div>
            <LatestOperations operations={latestIncomes} label={'Ostatnie wpłaty'} operationstype={'incomes'} onClick={seeAllOperationsHandler} buttonmore={'false'}/>
            <LatestOperations operations={latestExpense} label={'Ostatnie wypłaty'} operationstype={'expenses'} onClick={seeAllOperationsHandler} buttonmore={'true'}/>
            <Summary summarydata={summary} title={'Staystyki wydatków'}/>
            <Snackbars open={props.infoElementOpen} variant={props.infoElementVariant} message={props.infoElementText} onClose={props.onInfoELementClose}/>
      </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        incomes: state.wallet.incomes,
        expenses: state.wallet.expenses,
        incomeCategories: state.settings.incomeCategories,
        expenseCategories: state.settings.expenseCategories,
        totalIncome: state.wallet.totalIncome,
        totalExpense: state.wallet.totalExpense,
        infoElementOpen: state.settings.infoElementOpen,
        infoElementText: state.settings.infoElementText,
        infoElementVariant:state.settings.infoElementVariant
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendWalletRequest: (walletId) => dispatch(actions.onSendWalletRequest(walletId)),
        onSendCategoriesRequest: () => dispatch(actions.onSendCategoriesRequest()),
        onSaveExpense: (data) => dispatch(actions.onSaveExpense(data)),
        onSaveIncome: (data) => dispatch(actions.onSaveIncome(data)),
        onInfoELementClose: (event, reason) => dispatch(actions.onInfoELementClose(event, reason))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wallet, axios));