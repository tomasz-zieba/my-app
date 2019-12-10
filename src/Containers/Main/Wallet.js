import React, {useState, useEffect} from 'react';
import useStyles from '../../Style';
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
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
    
    const dispatch = useDispatch();
    const onSendWalletRequest = (walletId) => dispatch(actions.onSendWalletRequest(walletId));
    const onSendCategoriesRequest = () => dispatch(actions.onSendCategoriesRequest());
    const onSaveExpense = (data) => dispatch(actions.onSaveExpense(data));
    const onSaveIncome = (data) => dispatch(actions.onSaveIncome(data));
    const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));

    const incomes = useSelector(state => { return state.wallet.incomes })
    const expenses = useSelector(state => { return state.wallet.expenses });
    const incomeCategories = useSelector(state => { return state.settings.incomeCategories });
    const expenseCategories = useSelector(state => { return state.settings.expenseCategories });
    const totalIncome = useSelector(state => { return state.wallet.totalIncome });
    const totalExpense = useSelector(state => { return state.wallet.totalExpense });
    const infoElementOpen = useSelector(state => { return state.settings.infoElementOpen });
    const infoElementText = useSelector(state => { return state.settings.infoElementText });
    const infoElementVariant = useSelector(state => { return state.settings.infoElementVariant });


    useEffect(() => {
        if (incomeCategories.length === 0 || expenseCategories.length === 0){
            onSendCategoriesRequest();
        }
    }, [])

    useEffect(() => {
        onSendWalletRequest(props.match.params.id)
    }, []);

    useEffect(() => {
        const colors = [ theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main, theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light, theme.palette.info.light, theme.palette.warning.light, theme.palette.error.light ];
        let categoriesSummary = [];
        let usedCategoriesData = {}
        let expensesSum = 0;
        for (let i=0;expenses.length > i; i++) {

            if (!usedCategoriesData.hasOwnProperty(expenses[i].category)) {
                usedCategoriesData[expenses[i].category] = {
                    title: expenses[i].category,
                    value: parseFloat(expenses[i].value),
                    color: colors[i]
                }
            } else {
                usedCategoriesData[expenses[i].category].value += parseFloat(expenses[i].value)
            }
            expensesSum += parseFloat(expenses[i].value)
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
    }, [expenses]);

    const expenseClickHandler = (expenseData) => {
        onSaveExpense(expenseData);
    }
    const incomeClickHandler = (incomeData) => {
        onSaveIncome(incomeData)
    }

    const seeAllOperationsHandler = operationsType => () => {
            props.history.push({
                pathname: props.location.pathname + '/all_operations',
                hash: operationsType
            });
    }

    const incomeCategoriesNames = [];
    const expenseCategoriesNames = [];
    for (let i=0; i < incomeCategories.length; i++){
        incomeCategoriesNames.push(incomeCategories[i].name);
    }
    for (let i=0; i < expenseCategories.length; i++){
        expenseCategoriesNames.push(expenseCategories[i].name);
    }

    const latestIncomes = incomes.filter((income, index) => index < 5)
    const latestExpense = expenses.filter((expense, index) => index < 5)
    const classes = useStyles();
    return (
        <React.Fragment>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: "space-around"}}>
                <WalletForm 
                    label={'Dodaj nową transakcję'}
                    dateLabel={'Data transakcji: '}
                    categories={expenseCategoriesNames}   
                    clickHandler={(data) => expenseClickHandler(data)}
                    walletKey={props.match.params.id}
                    active={infoElementOpen}/>
                <div>
                    <InfoLabel value={totalIncome} name={'WPŁYWY'}/>
                    <InfoLabel value={totalExpense} name={'WYDATKI'}/>
                </div>
                <WalletForm 
                    label={'Zasil konto'}
                    dateLabel={'Data wpływu: '}
                    categories={incomeCategoriesNames} 
                    clickHandler={(data) => incomeClickHandler(data)}
                    walletKey={props.match.params.id}
                    active={infoElementOpen}/>
            </div>
            <LatestOperations operations={latestIncomes} label={'Ostatnie wpłaty'} operationstype={'incomes'} onClick={seeAllOperationsHandler} buttonmore={'false'}/>
            <LatestOperations operations={latestExpense} label={'Ostatnie wypłaty'} operationstype={'expenses'} onClick={seeAllOperationsHandler} buttonmore={'true'}/>
            <Summary summarydata={summary} title={'Staystyki wydatków'}/>
            <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose}/>
      </React.Fragment>
    )
}

export default withRouter(Wallet, axios);