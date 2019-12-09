import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => (
  {
  root: {
    height: 'auto',
    width: '90%',
    margin: '0 auto'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const Summary = props => {
  const { className, ...rest } = props;
  const [graphData, setGraphData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1,
        borderColor:'white',
        hoverBorderColor: 'white'
      }
    ],
    labels: []
  })

  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    let data = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          borderColor: theme.palette.white,
          hoverBorderColor: theme.palette.white
        }
      ],
      labels: []
    }

    for (var i=0; props.summarydata.length > i; i++) {
        data.datasets[0].data.push(parseFloat(props.summarydata[i].value));
        data.datasets[0].backgroundColor.push(props.summarydata[i].color);
        data.labels.push(props.summarydata[i].title);
      }
      setGraphData(data)
}, [props.summarydata])

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 85,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={props.title}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={graphData}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {props.summarydata.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

Summary.propTypes = {
  className: PropTypes.string
};

export default Summary;
