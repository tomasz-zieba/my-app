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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '50px auto',
    width: '100%',
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
    [theme.breakpoints.down(979)]: {
      minWidth: 'unset',
      display: 'block',
    },
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: '10px',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  table: {
    [theme.breakpoints.down(500)]: {
      display: 'block',
    },
  },
  TableHead: {
    [theme.breakpoints.down(500)]: {
      display: 'flex',
    },
  },
  TableBody: {
    [theme.breakpoints.down(500)]: {
      display: 'flex',
    },
  },
  TableRow: {
    [theme.breakpoints.down(500)]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  TableCell: {
    [theme.breakpoints.down(500)]: {
      padding: '10px 15px 10px 15px',
      flex: '1',
    },
  },
}));

const LatestOperations = ({
  operations, label, operationstype, onClick, buttonmore,
}) => {
  const classes = useStyles();
  let table = (
    <TableBody className={classes.TableBody}>
      <TableRow className={classes.TableRow} hover>
        <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
        <Media
          query="(min-width: 500px)"
          render={() => (
            <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
          )}
        />
        <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
        <TableCell className={classes.TableCell}>Ładuję dane...</TableCell>
      </TableRow>
    </TableBody>
  );

  if (operations !== null) {
    table = operations.map((operation) => (
      // eslint-disable-next-line no-underscore-dangle
      <TableBody className={classes.TableBody} key={operation._id}>
        <TableRow className={classes.TableRow} hover>
          <TableCell className={classes.TableCell}>{operation.date}</TableCell>
          <Media
            query="(min-width: 500px)"
            render={() => (
              <TableCell className={classes.TableCell}>{operation.info}</TableCell>
            )}
          />
          <TableCell className={classes.TableCell}>{operation.category}</TableCell>
          <TableCell className={classes.TableCell}>{operation.value.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    ));
  }
  return (
    <>
      <Card

        className={clsx(classes.root)}
      >
        <CardHeader
          title={label}
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table className={classes.table}>
                <TableHead className={classes.TableHead}>
                  <TableRow className={classes.TableRow}>
                    <TableCell className={classes.TableCell}>Data operacji</TableCell>
                    <Media
                      query="(min-width: 500px)"
                      render={() => (
                        <TableCell className={classes.TableCell}>Opis</TableCell>
                      )}
                    />
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
        <CardActions className={classes.actions}>
          {buttonmore === 'true' ? (
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={onClick(operationstype)}
            >
              Zobacz wszystkie
              {' '}
              <ArrowRightIcon />
            </Button>
          ) : null}

        </CardActions>
      </Card>
    </>
  );
};

export default LatestOperations;

LatestOperations.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  operationstype: PropTypes.string,
  onClick: PropTypes.func,
  buttonmore: PropTypes.string.isRequired,
};

LatestOperations.defaultProps = {
  operationstype: undefined,
  onClick: undefined,
};
