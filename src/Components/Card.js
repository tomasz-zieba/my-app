import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import walletImg from '../assets/wallet.jpg';
import theme from '../theme';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '30px 50px',
    [theme.breakpoints.down(757)]: {
      margin: '0 0 30px 0',
    }
  },
  cardName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  Button: {
    [theme.breakpoints.down(380)]: {
      fontSize: '12px',
      padding: '0'
    }
  }
});

function ImgMediaCard(props) {
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
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.cardName}>
            {props.name}
            {props.favouritesIcon}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.startDate} - {props.endDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.Button} onClick={props.open} size="small" color="primary">Otwórz</Button>
        <Button className={classes.Button} onClick={props.onRemove} size="small" color="primary">
          Usuń
        </Button>
        <Button className={classes.Button} onClick={props.favouritesToggle} size="small" color="primary">{props.favouritesButtonText}</Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(ImgMediaCard)