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
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


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
 
 const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const like_meal = async (idMeal) => {
  try {
    console.log(idMeal)
    const token = getCookie('authToken'); // Token aus Cookie holen
    const response = await fetch('http://127.0.0.1:7700/profile/like/meal/'+idMeal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Setze den Authorization-Header
      },
    })
      .then(response => response.json())
      .catch(error => console.error('Error fetching meals:', error));

    if (response.ok == false) {
      const error = await response.text();
      alert(`Login failed: ${error.message}`);
      return { type: 'CredentialsSignin', error: error.message || 'Invalid credentials.' };
    }
    alert(`Saved successful! This meal is stored in your gallery.`);
   
  } catch (error) {
    console.error('Login error:', error);
    alert('An unexpected error occurred. Please try again.');
    return { type: 'CredentialsSignin', error: error.message || 'Unexpected error occurred.' };
  }
 }

 
const dislike_meal = async (idMeal) => {
  try {
    console.log(idMeal)
    const token = getCookie('authToken'); // Token aus Cookie holen
    const response = await fetch('http://127.0.0.1:7700/profile/dislike/meal/'+idMeal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Setze den Authorization-Header
      },
    })
      .then(response => response.json())
      .catch(error => console.error('Error fetching meals:', error));

    if (response.ok == false) {
      const error = await response.text();
      alert(`Login failed: ${error.message}`);
      return { type: 'CredentialsSignin', error: error.message || 'Invalid credentials.' };
    }
    alert(`Unsaved successful! This meal is not stored in your gallery anymore.`);
   
  } catch (error) {
    console.error('Login error:', error);
    alert('An unexpected error occurred. Please try again.');
    return { type: 'CredentialsSignin', error: error.message || 'Unexpected error occurred.' };
  }
 }

 
 export default function MealRecipeReviewCard({meal}) {
  
   const [expanded, setExpanded] = React.useState(false);
   const handleExpandClick = () => {
     setExpanded(!expanded);
    };
    const [copied, setCopied] = React.useState(false);
    
    const handleCopyLink = () => {
      const mealLink = 'http://127.0.0.1:5173'+'/meal?mealQuery='+meal.strMeal.replace(" ", "%20").replace("&", "%26");
      
      navigator.clipboard
      .writeText(mealLink)
      .then(() => {
        setCopied(true);
        // Optionally reset the tooltip text after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
    };
   
   return (
     <Card sx={{ width: "22rem",  minHeight:"69vh" }}>
       <CardHeader
         action={
          <Tooltip onClick={handleCopyLink}  title={copied ? "Copied" : "Copy"} >
           <IconButton onClick={()=>{handleCopyLink(meal.strMeal)}}  aria-label="settings">
             <ShareIcon />
           </IconButton>
           </Tooltip>
         }
         subheader={meal.strCategory}
         title={meal.strMeal}
       />
       <a href={'/meal?mealQuery='+meal.strMeal.replace(" ", "%20").replace("&", "%26")}>
        <CardMedia
          component="img"
          height="fit-content"
          image={meal.pathImageMeal}
          alt={meal.strMeal}
          />
        </a>
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
         <IconButton onClick={()=>{like_meal(meal.idMeal)}}   aria-label="add to favorites">
           <FavoriteIcon />
         </IconButton>
         <IconButton onClick={()=>{dislike_meal(meal.idMeal)}}aria-label="share">
           <ThumbDownTwoToneIcon  />
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
 