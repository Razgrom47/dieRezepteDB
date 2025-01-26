/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';

// Helper function to capitalize the first letter of each word in a string
const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ') // Split the string by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join them back together with spaces
};

export default function Meal({ meal }) {
  const ingredientNames = [
    meal?.strIngredient1, meal?.strIngredient2, meal?.strIngredient3, meal?.strIngredient4,
    meal?.strIngredient5, meal?.strIngredient6, meal?.strIngredient7, meal?.strIngredient8,
    meal?.strIngredient9, meal?.strIngredient10, meal?.strIngredient11, meal?.strIngredient12,
    meal?.strIngredient13, meal?.strIngredient14, meal?.strIngredient15, meal?.strIngredient16,
    meal?.strIngredient17, meal?.strIngredient18, meal?.strIngredient19, meal?.strIngredient20
  ];

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
            image={meal?.pathImageMeal}
            alt={meal?.strMeal}
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
              {meal?.strMeal}
            </Typography>

            {/* Category and Area */}
            <Typography variant="body1" paragraph sx={{
              textAlign: 'center', marginBottom: 3, color: '#616161'
            }}>
              <strong>Category:</strong> {meal?.strCategory} | <strong>Area:</strong> {meal?.strArea}
            </Typography>

            {/* Ingredients */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6" color="textPrimary" sx={{
                fontWeight: 500, marginBottom: 1, color: 'primary.dark' 
              }}>
                Ingredients:
              </Typography>
              <List>
                {ingredientNames.map((ingredient, index) => (
                  ingredient && (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          alt={ingredient}
                          src={`/images/ingredients/${capitalizeWords(ingredient)}.png`} // Apply capitalization
                          sx={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={capitalizeWords(ingredient)}  /> 
                      <Button href={"http://localhost:7700/ingredients/name/"+capitalizeWords(ingredient)}> View Ingredient</Button> 
                    </ListItem>
                  )
                ))}
              </List>
            </Box>

            {/* Instructions */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6"  sx={{
                fontWeight: 500, marginBottom: 1, color: 'primary.dark'
              }}>
                Instructions:
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph sx={{
                lineHeight: 1.8, color: '#616161'
              }}>
                {meal?.strInstructions}
              </Typography>
            </Box>

            {/* Watch Video Button */}
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                href={meal?.strYoutube}
                target="_blank"
                sx={{
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
