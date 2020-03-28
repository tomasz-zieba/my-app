import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import walletImg from '../assets/wallet.jpg';
import theme from '../theme';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '30px 40px',
    [theme.breakpoints.down(700)]: {
      margin: '0 0 30px 0',
    },
  },
  cardName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '1',
  },
  cardNameWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  Button: {
    [theme.breakpoints.down(380)]: {
      fontSize: '12px',
      padding: '0',
    },
  },
});

function ImgMediaCard({
  name,
  isFavourite,
  startDate,
  endDate,
  open,
  onRemove,
  favouritesToggle,
  favouritesButtonText,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Wallet"
          height="140"
          image={walletImg}
          title="Wallet"
          onClick={open}
        />
        <CardContent>
          <div className={classes.cardNameWrapper}>
            <Typography onClick={open} gutterBottom variant="h5" component="h2" className={classes.cardName}>
              {name}
            </Typography>
            {isFavourite === 'true' ? <StarIcon onClick={favouritesToggle} /> : <StarBorderIcon onClick={favouritesToggle} />}
          </div>
          <Typography onClick={open} variant="body2" color="textSecondary" component="p">
            {startDate}
            {' '}
            -
            {endDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.Button} onClick={open} size="small" color="primary">Otwórz</Button>
        <Button className={classes.Button} onClick={onRemove} size="small" color="primary">
          Usuń
        </Button>
        <Button className={classes.Button} onClick={favouritesToggle} size="small" color="primary">{favouritesButtonText}</Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(ImgMediaCard);

ImgMediaCard.propTypes = {
  name: PropTypes.string.isRequired,
  isFavourite: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  favouritesButtonText: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  favouritesToggle: PropTypes.func.isRequired,
};
