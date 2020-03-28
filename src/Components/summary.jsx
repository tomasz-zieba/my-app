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
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    root: {
      height: 'auto',
      width: '100%',
      margin: '0 auto',
    },
    chartContainer: {
      position: 'relative',
      height: '300px',
    },
    stats: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      [theme.breakpoints.down(500)]: {
        justifyContent: 'space-between',
      },
    },
    device: {
      textAlign: 'center',
      padding: theme.spacing(1),
    },
    deviceIcon: {
      color: theme.palette.icon,
    },
  }));

const Summary = ({ summarydata, title }) => {
  const [graphData, setGraphData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1,
        borderColor: 'white',
        hoverBorderColor: 'white',
      },
    ],
    labels: [],
  });

  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    const data = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          borderColor: theme.palette.white,
          hoverBorderColor: theme.palette.white,
        },
      ],
      labels: [],
    };

    for (let i = 0; summarydata.length > i; i += 1) {
      data.datasets[0].data.push(parseFloat(summarydata[i].value));
      data.datasets[0].backgroundColor.push(summarydata[i].color);
      data.labels.push(summarydata[i].title);
    }
    setGraphData(data);
  }, [summarydata, theme.palette.white]);

  const options = {
    legend: {
      display: false,
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
      footerFontColor: theme.palette.text.secondary,
    },
  };

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader
        title={title}
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
          {summarydata.map((device) => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h3"
              >
                {device.value}
                %
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

Summary.propTypes = {
  summarydata: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Summary;
