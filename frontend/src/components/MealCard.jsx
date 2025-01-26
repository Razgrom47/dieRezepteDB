/* eslint-disable react/prop-types */
  import * as React from 'react';
 import { styled } from '@mui/material/styles';
 import Card from '@mui/material/Card';
 import CardHeader from '@mui/material/CardHeader';
 import CardMedia from '@mui/material/CardMedia';
 import CardContent from '@mui/material/CardContent';
 import CardActions from '@mui/material/CardActions';
 import Collapse from '@mui/material/Collapse';
 import IconButton from '@mui/material/IconButton';
 import Typography from '@mui/material/Typography';
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import ShareIcon from '@mui/icons-material/Share';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
 
const ExpandMore = styled((props) => {
   // eslint-disable-next-line no-unused-vars
   const { expand, ...other } = props;
   return <IconButton {...other} />;
 })(({ theme }) => ({
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
     duration: theme.transitions.duration.shortest,
   }),
   variants: [
     {
       props: ({ expand }) => !expand,
       style: {
         transform: 'rotate(0deg)',
       },
     },
     {
       props: ({ expand }) => !!expand,
       style: {
         transform: 'rotate(180deg)',
       },
     },
   ],
 }));
 
 export default function MealRecipeReviewCard({meal}) {
   const [expanded, setExpanded] = React.useState(false);
 
   const handleExpandClick = () => {
     setExpanded(!expanded);
   };
 
   return (
     <Card sx={{ width: "22rem" }}>
       <CardHeader
         action={
           <IconButton aria-label="settings">
             <MoreVertIcon />
           </IconButton>
         }
         subheader={meal.strCategory}
         title={meal.strMeal}
       />
       <CardMedia
         component="img"
         height="fit-content"
         image={meal.pathImageMeal}
         alt={meal.strMeal}
       />
       <CardContent>
         <Typography variant="body2">
         <Button
                variant="contained"
                href={meal?.strYoutube}
                
                sx={{
                  backgroundColor:"#98FF98",
                  borderRadius: 25,
                  padding: '14px 40px',
                  fontWeight: 600,
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 10,
                  },
                }}
              >
                Watch Video
              </Button>
         </Typography>
       </CardContent>
       <CardActions disableSpacing>
         <IconButton aria-label="add to favorites">
           <FavoriteIcon />
         </IconButton>
         <IconButton aria-label="share">
           <ShareIcon />
         </IconButton>
         <ExpandMore
           expand={expanded}
           onClick={handleExpandClick}
           aria-expanded={expanded}
           aria-label="show more"
         >
           <ExpandMoreIcon />
         </ExpandMore>
       </CardActions>
       <Collapse in={expanded} timeout="auto" unmountOnExit>
         <CardContent>
           <Typography sx={{ marginBottom: 2 }}>Instructions:</Typography>
           <Typography sx={{ marginBottom: 2 }}>
             {meal.strInstructions}
           </Typography>
         </CardContent>
       </Collapse>
     </Card>
   );
 }
 