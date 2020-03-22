import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
      width: '90%'
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800
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
  }
}));

const LatestOperations = props => {
  const { className } = props;

  const classes = useStyles();
  const operationsType = props.operationstype;
  let table = (<TableBody>
                <TableRow hover>
                  <TableCell>Ładuję dane...</TableCell>
                  <TableCell>Ładuję dane...</TableCell>
                  <TableCell>Ładuję dane...</TableCell>
                  <TableCell>Ładuję dane...</TableCell>
                </TableRow>
              </ TableBody>)

  if (props.operations !== null) {
    table = props.operations.map((operation) => {
                return (
                  <TableBody key={operation._id}>
                    <TableRow hover>
                    <TableCell>{operation.date}</TableCell>
                    <TableCell>{operation.info}</TableCell>
                    <TableCell>{operation.category}</TableCell>
                    <TableCell>{operation.value.toFixed(2)}</TableCell>
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data operacji</TableCell>
                  <TableCell>Opis</TableCell>
                  <TableCell>Kategoria</TableCell>
                  <TableCell>Kwota</TableCell>
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
