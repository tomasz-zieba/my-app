import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import * as actions from '../../store/actions/index';
import useStyles from '../../Style';
import StandardTextField from '../../Components/TextField';
import CategoriesList from '../../Components/ListItem/CategoriesList';
import Snackbars from '../../Components/SnackBar';
import Loader from '../../Components/Loader';

function Settings() {
  const classes = useStyles();

  const [incomeCategoryAdd, setIncomeCategoryAdd] = useState('');
  const [expenseCategoryAdd, setExpenseCategoryAdd] = useState('');
  const [incomeCategoriesChecked, setIncomeCategoriesChecked] = useState([]);
  const [expenseCategoriesChecked, setExpenseCategoriesChecked] = useState([]);

  const [incomeCategoryAddDrawer, setIncomeCategoryAddDrawer] = useState(false);
  const [incomeCategoryRemoveDrawer, setIncomeCategoryRemoveDrawer] = useState(false);
  const [expenseCategoryAddDrawer, setExpenseCategoryAddDrawer] = useState(false);
  const [expenseCategoryRemoveDrawer, setExpenseCategoryRemoveDrawer] = useState(false);

  const dispatch = useDispatch();
  const onIncCatAdd = (IncomeCategory) => dispatch(actions.onIncomeCategoryAdd(IncomeCategory));
  const onExpCatAdd = (ExpenseCategory) => dispatch(actions.onExpenseCategoryAdd(ExpenseCategory));
  const onCatRem = (keys, categoryType) => dispatch(actions.onCategoryRemove(keys, categoryType));
  const onSendCategoriesRequest = () => dispatch(actions.onSendCategoriesRequest());
  const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
  const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));

  const incomeCategories = useSelector((state) => state.settings.incomeCategories);
  const expenseCategories = useSelector((state) => state.settings.expenseCategories);
  const infoElementOpen = useSelector((state) => state.settings.infoElementOpen);
  const infoElementText = useSelector((state) => state.settings.infoElementText);
  const infoElementVariant = useSelector((state) => state.settings.infoElementVariant);
  const requestSended = useSelector((state) => state.settings.requestSended);

  useEffect(() => {
    if (incomeCategories.length === 0) {
      onSendCategoriesRequest();
    }
    // eslint-disable-next-line
  }, []);

  const incomeInputChangeHandler = (event) => {
    setIncomeCategoryAdd(event.target.value);
  };
  const incomeClickHandler = () => {
    if (incomeCategories.includes(incomeCategoryAdd.trim())) {
      onInfoELementOpen('error', 'This category already exists.');
      return false;
    }
    onIncCatAdd(incomeCategoryAdd);
    return true;
  };

  const expenseInputChangeHandler = (event) => {
    setExpenseCategoryAdd(event.target.value);
  };
  const expenseClickHandler = () => {
    if (expenseCategories.includes(expenseCategoryAdd.trim())) {
      onInfoELementOpen('error', 'This category already exists.');
      return false;
    }
    onExpCatAdd(expenseCategoryAdd);
    return true;
  };

  const incomeCategoriesRemoveClickHandler = () => {
    onCatRem(incomeCategoriesChecked, 'income');
  };
  const expenseCategoriesRemoveClickHandler = () => {
    onCatRem(expenseCategoriesChecked, 'expense');
  };

  const incomeHandleToggle = (categoryName) => () => {
    const currentIndex = incomeCategoriesChecked.indexOf(categoryName);
    const newChecked = [...incomeCategoriesChecked];

    if (currentIndex === -1) {
      newChecked.push(categoryName);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setIncomeCategoriesChecked(newChecked);
  };

  const expenseHandleToggle = (categoryName) => () => {
    const currentIndex = expenseCategoriesChecked.indexOf(categoryName);
    const newChecked = [...expenseCategoriesChecked];

    if (currentIndex === -1) {
      newChecked.push(categoryName);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setExpenseCategoriesChecked(newChecked);
  };

  let incomeCategoriesList = 'Brak zdefiniowanych kategorii wpływów.';
  if (incomeCategories.length !== 0) {
    const categories = incomeCategories.map((categoryName) => (
      {
        key: `${categoryName}income`,
        name: categoryName,
      }
    ));

    incomeCategoriesList = (
      <CategoriesList
        onClick={incomeHandleToggle}
        list={categories}
        checked={incomeCategoriesChecked}
        removeClick={incomeCategoriesRemoveClickHandler}
        label="Kategorie wpływów"
      />
    );
  }

  let expenseCategoriesList = 'Brak zdefiniowanych kategorii wydatków.';
  if (expenseCategories.length !== 0) {
    const categories = expenseCategories.map((categoryName) => (
      {
        key: `${categoryName}expense`,
        name: categoryName,
      }
    ));

    expenseCategoriesList = (
      <CategoriesList
        onClick={expenseHandleToggle}
        list={categories}
        checked={expenseCategoriesChecked}
        removeClick={expenseCategoriesRemoveClickHandler}
        label="Kategorie wydatków"
      />
    );
  }
  return (
    <>
      <Media
        query="(min-width: 980px)"
        render={() => (
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'baseline',
          }}
          >
            <div style={{ maxWidth: '250px' }}>
              <div>
                <StandardTextField
                  type="text"
                  label="Dodaj kategorię wpływów"
                  value={incomeCategoryAdd}
                  changed={(event) => incomeInputChangeHandler(event)}
                />
                <Button
                  onClick={incomeClickHandler}
                  style={{ width: '251px', marginTop: '30px' }}
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  Wyślij
                </Button>
              </div>
              <div>
                <StandardTextField
                  type="text"
                  label="Dodaj kategorię wydatków"
                  value={expenseCategoryAdd}
                  changed={(event) => expenseInputChangeHandler(event)}
                />
                <Button
                  onClick={expenseClickHandler}
                  style={{ width: '251px', marginTop: '30px' }}
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  Wyślij
                </Button>
              </div>
            </div>
            <div style={{ maxWidth: '300px' }}>{incomeCategoriesList}</div>
            <div style={{ maxWidth: '300px' }}>{expenseCategoriesList}</div>
          </div>
        )}
      />
      <Media
        query="(max-width: 979px)"
        render={() => (
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'baseline',
          }}
          >
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setIncomeCategoryAddDrawer(true)}
              color="primary"
              variant="contained"
              size="large"
            >
              Dodaj kategorię wpływów
            </Button>
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setIncomeCategoryRemoveDrawer(true)}
              color="primary"
              variant="contained"
              size="large"
            >
              Usuń kategorie wpływów
            </Button>
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setExpenseCategoryAddDrawer(true)}
              color="primary"
              variant="contained"
              size="large"
            >
              Dodaj kategorię wydatdków
            </Button>
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setExpenseCategoryRemoveDrawer(true)}
              color="primary"
              variant="contained"
              size="large"
            >
              Usuń kategorie wydatdków
            </Button>
            <Drawer
              anchor="right"
              open={incomeCategoryAddDrawer}
              onClose={() => setIncomeCategoryAddDrawer(false)}
            >
              <div style={{ width: '300px', margin: '10px' }}>
                <StandardTextField
                  style={{ width: '300px' }}
                  label="Dodaj kategorię wpływów"
                  type="text"
                  value={incomeCategoryAdd}
                  changed={(event) => incomeInputChangeHandler(event)}
                />
                <Button
                  onClick={incomeClickHandler}
                  style={{ width: '300px', marginTop: '30px' }}
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  Wyślij
                </Button>
              </div>
            </Drawer>
            <Drawer
              anchor="right"
              open={expenseCategoryAddDrawer}
              onClose={() => setExpenseCategoryAddDrawer(false)}
            >
              <div style={{ width: '300px', margin: '10px' }}>
                <StandardTextField
                  style={{ width: '300px' }}
                  label="Dodaj kategorię wydatków"
                  type="text"
                  value={expenseCategoryAdd}
                  changed={(event) => expenseInputChangeHandler(event)}
                />
                <Button
                  onClick={expenseClickHandler}
                  style={{ width: '300px', marginTop: '30px' }}
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  Wyślij
                </Button>
              </div>
            </Drawer>
            <Drawer
              anchor="right"
              open={incomeCategoryRemoveDrawer}
              onClose={() => setIncomeCategoryRemoveDrawer(false)}
            >
              <div style={{ width: '300px', margin: '10px' }}>{incomeCategoriesList}</div>
            </Drawer>
            <Drawer
              anchor="right"
              open={expenseCategoryRemoveDrawer}
              onClose={() => setExpenseCategoryRemoveDrawer(false)}
            >
              <div style={{ width: '300px', margin: '10px' }}>{expenseCategoriesList}</div>
            </Drawer>
          </div>
        )}
      />
      {requestSended ? <Loader /> : ''}
      <Snackbars
        open={infoElementOpen}
        variant={infoElementVariant}
        message={infoElementText}
        onClose={onInfoELementClose}
      />
    </>
  );
}

export default Settings;
