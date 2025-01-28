/* eslint-disable react/prop-types */
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const Home = ({ areas, latestMeals, randomIngredients }) => {
  const user = {
    name: "John Doe",
    country: "USA",
    profilePicture: "https://via.placeholder.com/100", // Placeholder for avatar
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'background.paper' }}>
        <img
          rel="icon"
          type="image/svg+xml"
          src="/food-svgrepo-com.svg"
          alt={user.name}
          style={{ width: 100, height: 100, marginRight: 15 }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#98FF98' }}>
            dieRezepteDB
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Status:</strong> online
          </Typography>
        </Box>
      </Box>

      {/* Latest Meals Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Latest Meals
        </Typography>
        <Button href='/meals' variant="contained" color="primary" sx={{ marginBottom: 3, background: '#98FF98' }}>
          Browse All Meals
        </Button>
        <Grid container spacing={3}>
          {latestMeals?.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, backgroundColor: 'background.default' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {meal.strMeal}
                    </Typography>
                    <Button size="small" sx={{ color:'#98FF98' }} href={`/meal?mealQuery=${meal.strMeal.replace("&","%26")}`}>
                      View Meal
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Random Ingredients Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Random Ingredients
        </Typography>
        <Button variant="contained" color="primary" href="/ingredients" sx={{ marginBottom: 3, background: '#98FF98' }}>
          Browse All Ingredients
        </Button>
        <Grid container spacing={3}>
          {randomIngredients?.map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, backgroundColor: 'background.default' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {ingredient.strIngredient}
                    </Typography>
                    <Button size="small" sx={{ color: '#98FF98' }} href={`/ingredient?ingredientQuery=${ingredient.strIngredient}`}>
                      View Ingredient
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* All Areas Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          All Areas
        </Typography>
        <Grid container spacing={3}>
          {areas?.map((area, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, backgroundColor: 'background.default' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {area}
                    </Typography>
                    <Button size="small" sx={{ color: '#98FF98' }} href={`/meals?searchquery=${area}&param=Area`}>
                      View Meals
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
