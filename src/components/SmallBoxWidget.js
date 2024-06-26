import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  widget: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease',
    height: '150px', // Adjusted height to accommodate footer
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },

  ff9a32:{
    backgroundColor:'#ff9a32'
  },
  icon: {
    fontSize: 20, // Increased icon size
    transition: 'font-size 0.3s ease',
  },
  iconHover: {
    '&:hover': {
      fontSize: 30, // Larger icon on hover
    },
  },
  text: {
    textAlign: 'right',
    height:'100px'
  },
  footer: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
  },
}));

const SmallBoxWidget = ({ title, value, icon, color, link, footerText }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.widget} ${classes[color]}`}>
      
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <span className={`${classes.icon} ${classes.iconHover}`}>{icon}</span>
          <CardContent className={classes.text}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </CardContent>
        </Box>
        <Divider />
        <CardActionArea component={Link} to={link}>
        <Box className={classes.footer}>
          <Typography variant="body2">{footerText}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default SmallBoxWidget;
