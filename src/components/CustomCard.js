import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, CardHeader, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';

const CustomCard = ({ title, description, imageUrl, avatarLetter }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatarLetter}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
