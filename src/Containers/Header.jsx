import React from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

function Header({
  open, DrawerToggle, history,
}) {
  const useStyles = makeStyles((theme) => ({
    Toolbar: {
      [theme.breakpoints.down(980)]: {
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.Toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={DrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Media
            query="(max-width: 980px)"
            render={() => (
              <ArrowBackIcon onClick={history.goBack} />
            )}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Header);

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  DrawerToggle: PropTypes.func.isRequired,
  history: PropTypes.objectOf((PropTypes.any)).isRequired,
};
