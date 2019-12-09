import React, { useState, useEffect} from 'react';
import useStyles from '../../Style';
import Button from '@material-ui/core/Button';
import StandardTextField from '../../Components/TextField';
import { connect } from 'react-redux';
import CategoriesList from '../../Components/ListItem/CategoriesList';
import Snackbars from '../../Components/SnackBar';

import * as actions from '../../store/actions/index';

function Settings (props) {

    const classes = useStyles();

    const [incomeCategoryAdd, setIncomeCategoryAdd] = useState('')
    const [expenseCategoryAdd, setExpenseCategoryAdd] = useState('')
    const [incomeCategoriesChecked, setIncomeCategoriesChecked] = useState([]);
    const [expenseCategoriesChecked, setExpenseCategoriesChecked] = useState([]);

    useEffect(() => {
        if(props.incomeCategories.length === 0){
            props.onSendCategoriesRequest();
        }
    }, []);

    const incomeInputChangeHandler = (event) => {
        setIncomeCategoryAdd(event.target.value)
    }
    const incomeClickHandler = () => {
        props.onIncomeCategoryAdd(incomeCategoryAdd);
    }

    const expenseInputChangeHandler = (event) => {
        setExpenseCategoryAdd(event.target.value)
    }
    const expenseClickHandler = () => {
        props.onExpenseCategoryAdd(expenseCategoryAdd);
    }

    const incomeCategoriesRemoveClickHandler = () => {
        props.onCategoryRemove(incomeCategoriesChecked, 'income');
    }
    const expenseCategoriesRemoveClickHandler = () => {
        props.onCategoryRemove(expenseCategoriesChecked, 'expense');
    }

    const incomeHandleToggle = value => () => {
        const currentIndex = incomeCategoriesChecked.indexOf(value);
        const newChecked = [...incomeCategoriesChecked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setIncomeCategoriesChecked(newChecked);
    };

    const expenseHandleToggle = value => () => {
        const currentIndex = expenseCategoriesChecked.indexOf(value);
        const newChecked = [...expenseCategoriesChecked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setExpenseCategoriesChecked(newChecked);
    };

      let incomeCategories = 'Brak zdefiniowanych kategorii wpływów.'
      if (props.incomeCategories.length !== 0) {
        const categories = props.incomeCategories.map(category => {
            return (
                {
                    key: category.key,
                    name: category.name
                }
            );
        });

        incomeCategories = (
            <CategoriesList 
                onClick={incomeHandleToggle}
                list={categories}
                checked={incomeCategoriesChecked}
                removeClick={incomeCategoriesRemoveClickHandler}
                label={'Kategorie wpływów'}
                />
        )
      };

      let expenseCategories = 'Brak zdefiniowanych kategorii wydatków.'
      if (props.expenseCategories.length !== 0) {
        const categories = props.expenseCategories.map(category => {
            return (
                {
                    key: category.key,
                    name: category.name
                }
            );
        });

        expenseCategories = (
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
                        // disabled={props.active} 
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
                        // disabled={props.active} 
                        style={{width: '251px', marginTop: '30px'}} 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.margin}
                        >Wyślij</Button>
                    </div>
                </div>
                <div style={{maxWidth: '300px'}}>{incomeCategories}</div>
                <div style={{maxWidth: '300px'}}>{expenseCategories}</div>
            </div>
            <Snackbars open={props.infoElementOpen} variant={props.infoElementVariant} message={props.infoElementText} onClose={props.onInfoELementClose}/>
      </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        incomeCategories: state.settings.incomeCategories,
        expenseCategories: state.settings.expenseCategories,
        infoElementOpen: state.settings.infoElementOpen,
        infoElementText: state.settings.infoElementText,
        infoElementVariant:state.settings.infoElementVariant
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncomeCategoryAdd: (IncomeCategory) => dispatch(actions.onIncomeCategoryAdd(IncomeCategory)),
        onExpenseCategoryAdd: (ExpenseCategory) => dispatch(actions.onExpenseCategoryAdd(ExpenseCategory)),
        onCategoryRemove: (keys, categoryType) => dispatch(actions.onCategoryRemove(keys, categoryType)),
        onSendCategoriesRequest: () => dispatch(actions.onSendCategoriesRequest()),
        onInfoELementClose: (event, reason) => dispatch(actions.onInfoELementClose(event, reason))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);