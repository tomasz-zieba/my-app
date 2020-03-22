import React, { useState, useEffect} from 'react';
import useStyles from '../../Style';
import Button from '@material-ui/core/Button';
import StandardTextField from '../../Components/TextField';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesList from '../../Components/ListItem/CategoriesList';
import Snackbars from '../../Components/SnackBar';
import Loader from '../../Components/Loader';

import * as actions from '../../store/actions/index';

function Settings (props) {

    const classes = useStyles();

    const [incomeCategoryAdd, setIncomeCategoryAdd] = useState('')
    const [expenseCategoryAdd, setExpenseCategoryAdd] = useState('')
    const [incomeCategoriesChecked, setIncomeCategoriesChecked] = useState([]);
    const [expenseCategoriesChecked, setExpenseCategoriesChecked] = useState([]);

    const dispatch = useDispatch();
    const onIncomeCategoryAdd = (IncomeCategory) => dispatch(actions.onIncomeCategoryAdd(IncomeCategory));
    const onExpenseCategoryAdd = (ExpenseCategory) => dispatch(actions.onExpenseCategoryAdd(ExpenseCategory));
    const onCategoryRemove = (keys, categoryType) => dispatch(actions.onCategoryRemove(keys, categoryType));
    const onSendCategoriesRequest = () => dispatch(actions.onSendCategoriesRequest());
    const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
    const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));

    const incomeCategories = useSelector(state => { return state.settings.incomeCategories });
    const expenseCategories = useSelector(state => { return state.settings.expenseCategories });
    const infoElementOpen = useSelector(state => { return state.settings.infoElementOpen });
    const infoElementText = useSelector(state => { return state.settings.infoElementText });
    const infoElementVariant = useSelector(state => { return state.settings.infoElementVariant });
    const requestSended = useSelector(state => { return state.settings.requestSended });

    useEffect(() => {
        if(incomeCategories.length === 0){
            onSendCategoriesRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const incomeInputChangeHandler = (event) => {
        setIncomeCategoryAdd(event.target.value)
    }
    const incomeClickHandler = () => {
        if(incomeCategories.includes(incomeCategoryAdd.trim())) {
            onInfoELementOpen('error', 'This category already exists.');
            return false;
        }
        onIncomeCategoryAdd(incomeCategoryAdd);
    }

    const expenseInputChangeHandler = (event) => {
        setExpenseCategoryAdd(event.target.value)
    }
    const expenseClickHandler = () => {
        if(expenseCategories.includes(expenseCategoryAdd.trim())) {
            onInfoELementOpen('error', 'This category already exists.');
            return false;
        }
        onExpenseCategoryAdd(expenseCategoryAdd);
    }

    const incomeCategoriesRemoveClickHandler = () => {
        onCategoryRemove(incomeCategoriesChecked, 'income');
    }
    const expenseCategoriesRemoveClickHandler = () => {
        onCategoryRemove(expenseCategoriesChecked, 'expense');
    }

    const incomeHandleToggle = categoryName => () => {
        const currentIndex = incomeCategoriesChecked.indexOf(categoryName);
        const newChecked = [...incomeCategoriesChecked];
    
        if (currentIndex === -1) {
          newChecked.push(categoryName);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setIncomeCategoriesChecked(newChecked);
    };

    const expenseHandleToggle = categoryName => () => {
        const currentIndex = expenseCategoriesChecked.indexOf(categoryName);
        const newChecked = [...expenseCategoriesChecked];
    
        if (currentIndex === -1) {
          newChecked.push(categoryName);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setExpenseCategoriesChecked(newChecked);
    };

      let incomeCategoriesList = 'Brak zdefiniowanych kategorii wpływów.'
      if (incomeCategories.length !== 0) {
        const categories = incomeCategories.map(categoryName => {
            return (
                {
                    key: categoryName + 'income',
                    name: categoryName
                }
            );
        });

        incomeCategoriesList = (
            <CategoriesList 
                onClick={incomeHandleToggle}
                list={categories}
                checked={incomeCategoriesChecked}
                removeClick={incomeCategoriesRemoveClickHandler}
                label={'Kategorie wpływów'}
                />
        )
      };

      let expenseCategoriesList = 'Brak zdefiniowanych kategorii wydatków.'
      if (expenseCategories.length !== 0) {
        const categories = expenseCategories.map(categoryName => {
            return (
                {
                    key: categoryName + 'expense',
                    name: categoryName
                }
            );
        });

        expenseCategoriesList = (
            <CategoriesList 
                onClick={expenseHandleToggle}
                list={categories}
                checked={expenseCategoriesChecked}
                removeClick={expenseCategoriesRemoveClickHandler}
                label={'Kategorie wydatków'}
                />
        )
      };
    return (
      <React.Fragment>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'baseline'}}>
                <div style={{maxWidth: '250px'}}>
                    <div>
                    <StandardTextField 
                        label="Dodaj kategorię wpływów" 
                        value={incomeCategoryAdd}
                        changed={(event) => incomeInputChangeHandler(event)}
                        />
                        <Button 
                        onClick={incomeClickHandler}
                        style={{width: '251px', marginTop: '30px'}} 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.margin}
                        >Wyślij</Button> 
                    </div>
                    <div>
                        <StandardTextField 
                        label="Dodaj kategorię wydatków" 
                        value={expenseCategoryAdd}
                        changed={(event) =>  expenseInputChangeHandler(event)}
                        />
                        <Button 
                        onClick={expenseClickHandler}
                        style={{width: '251px', marginTop: '30px'}} 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.margin}
                        >Wyślij</Button>
                    </div>
                </div>
                <div style={{maxWidth: '300px'}}>{incomeCategoriesList}</div>
                <div style={{maxWidth: '300px'}}>{expenseCategoriesList}</div>
            </div>
            {requestSended ? <Loader /> : ''}
            <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose}/>
      </React.Fragment>
    )
}

export default Settings;