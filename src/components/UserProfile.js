import React from 'react';
import { Card, CardContent, Avatar, Typography, Container, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useSelector} from 'react-redux'
const useStyles = makeStyles((theme) => ({
  profileCard: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  details: {
    marginTop: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(1),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user)
 

  return (
    <Container>
      <Card className={classes.profileCard}>
        <Avatar alt={user.name} src={user.imageUrl} className={classes.avatar} />
        <CardContent>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.details}>
            {user.bio}
          </Typography>
          <Box className={classes.details}>
            <Typography variant="body1" className={classes.info}>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
