import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Media from 'react-media';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {
      margin: '50px auto',
      width: '100%'
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
    [theme.breakpoints.down(979)]: {
      minWidth: 'unset',
      display: 'block'
    }
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: '10px'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  table: {
    [theme.breakpoints.down(500)]: {
      display: 'block'
    }
  },
  TableCell: {
    [theme.breakpoints.down(500)]: {
      padding: '10px 15px 10px 15px'
    }
  }
}));

const LatestOperations = props => {
  const { className } = props;

  const classes = useStyles();
  const operationsType = props.operationstype;
  let table = (<TableBody>
                <TableRow hover>
                  <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
                  <Media query="(min-width: 500px)" render={() =>(
                    <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
                  )} />
                  <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
                  <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
                </TableRow>
              </ TableBody>)

  if (props.operations !== null) {
    table = props.operations.map((operation) => {
                return (
                  <TableBody key={operation._id}>
                    <TableRow hover>
                    <TableCell className={classes.TableCell}>{operation.date}</TableCell>
                    <Media query="(min-width: 500px)" render={() =>(
                      <TableCell className={classes.TableCell}>{operation.info}</TableCell>
                    )} />
                    <TableCell className={classes.TableCell}>{operation.category}</TableCell>
                    <TableCell className={classes.TableCell}>{operation.value.toFixed(2)}</TableCell>
                    </TableRow>
                  </ TableBody>
                )})
  }
  return (
    <React.Fragment>
    <Card
    
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={props.label}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.TableCell}>Data operacji</TableCell>
                  <Media query="(min-width: 500px)" render={() =>(
                    <TableCell className={classes.TableCell}>Opis</TableCell>
                  )} />
                  <TableCell className={classes.TableCell}>Kategoria</TableCell>
                  <TableCell className={classes.TableCell}>Kwota</TableCell>
                </TableRow>
              </TableHead>
                {table} 
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions  className={classes.actions}>
      {props.buttonmore === 'true' ? <Button
          color="primary"
          size="small"
          variant="text"
          onClick={props.onClick(operationsType)}
        >
          Zobacz wszystkie <ArrowRightIcon />
        </Button> : null}
        
      </CardActions>
    </Card>
    </React.Fragment>
  );
};

LatestOperations.propTypes = {
  className: PropTypes.string
};

export default LatestOperations;
