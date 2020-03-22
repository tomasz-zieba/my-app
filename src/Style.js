import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  rootWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  info: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '25px',
    fontFamily: '"Roboto Condensed", sans-serif',
    fontWeight: '700',
    lineHeight: '1',
    textTransform: 'uppercase'
  },
  infoSpan: {
    width: '73px',
    height: '4px',
    margin: '8px auto 0',
    display: 'block',
    backgroundColor: '#3f51b5',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: '9999'
  },
  drawerOpenMobile: {
    display: 'none'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default useStyles;