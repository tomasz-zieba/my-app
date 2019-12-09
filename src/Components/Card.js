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

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '30px 50px'
  },
  cardName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="http://t0.gstatic.com/images?q=tbn:ANd9GcRtn8IMIQgn0-1t9FVA5ivTEIp5BFsPuUoed8jScrvFFR7hK1IEcALj9Ix7s52ESDkrqJx5RBpjQ15jNtXBl1U"
          title="Contemplative Reptile"
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
        <Button onClick={props.open} size="small" color="primary">Otwórz</Button>
        <Button onClick={props.onRemove} size="small" color="primary">
          Usuń
        </Button>
        <Button onClick={props.favouritesToggle} size="small" color="primary">{props.favouritesButtonText}</Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(ImgMediaCard)