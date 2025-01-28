/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';


export default function Ingredient({ ingredient, meals }) {

  return (
    <Grid container justifyContent="center" sx={{ padding: 2 }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card sx={{
          borderRadius: 8,
          boxShadow: 6,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 12,
          },
        }}>
          {/* Image Section */}
          <CardMedia
            component="img"
            height="auto"
            image={ingredient?.pathImageIngredient}
            alt={ingredient?.strIngredient}
            sx={{
              objectFit: 'cover',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <CardContent sx={{ padding: 4 }}>
            {/* Meal Title */}
            <Typography variant="h4" sx={{
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.4rem' },
              marginBottom: 2,
              textAlign: 'center',
            }}>
              {ingredient?.strIngredient}
            </Typography>

            {/* Category and Area */}
            {ingredient?.strType !== "None" &&
            <Typography variant="body1" paragraph sx={{
              textAlign: 'center', marginBottom: 3, color: '#616161'
            }}>
              <strong>Category:</strong> {ingredient?.strType}  
            </Typography>}

            {/* Ingredients */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6" color="textPrimary" sx={{
                fontWeight: 500, marginBottom: 1,  color: '#98FF98'
              }}>
                Meals:
              </Typography>
              <List>
                {meals?.map(meal=> (
                  meal && (
                    <ListItem key={meal.idMeal}>
                      <ListItemAvatar>
                        <Avatar
                          alt={meal.strMeal}
                          src={meal.pathImageMeal} // Apply capitalization
                          sx={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={meal.strMeal}  /> 
                      <Button href={"/meal?mealQuery="+meal.strMeal.replace(" ", "%20").replace("&", "%26")} sx={{ color: '#98FF98'}}> View Meal</Button> 
                    </ListItem>
                  )
                ))}
              </List>
            </Box>

            {/* Instructions */}
            { ingredient?.strDescription &&
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6"  sx={{
                fontWeight: 500, marginBottom: 1, color: '#98FF98'
              }}>
                Description:
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph sx={{
                lineHeight: 1.8, color: '#616161'
              }}>
                {ingredient?.strDescription}
              </Typography>
            </Box>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
