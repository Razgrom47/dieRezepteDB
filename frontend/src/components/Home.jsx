import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
const Home = () => {
  const user = {
    name: "John Doe",
    country: "USA",
    profilePicture: "https://via.placeholder.com/100", // Placeholder for avatar
  };

  const latestMeals = [
    "Spaghetti Carbonara",
    "Chicken Alfredo",
    "Sushi Rolls",
    "Tacos",
    "Chicken Alfredo",
    "Sushi Rolls",
  ];

  const randomIngredients = [
    "Garlic",
    "Avocado",
    "Chicken",
    "Tomato",
    "Avocado",
    "Chicken",
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, padding: 2, borderRadius: 2, boxShadow: 3 }}>
        <img  rel="icon" type="image/svg+xml"
          src="/food-svgrepo-com.svg"
          alt={user.name}
          style={{ width: 100, height: 100, marginRight: 5 }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
            dieRezepteDB
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> online
          </Typography>
        </Box>
      </Box>

      {/* Latest Meals Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Latest Meals
        </Typography>
        <Button variant="contained" color="primary" href="/browse-meals" sx={{ marginBottom: 3 }}>
          Browse All Meals
        </Button>
        <Grid container spacing={3}>
          {latestMeals.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {meal}
                    </Typography>
                    <Button size="small" color="primary" href="/browse-meals">
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
        <Button variant="contained" color="primary" href="/browse-ingredients" sx={{ marginBottom: 3 }}>
          Browse All Ingredients
        </Button>
        <Grid container spacing={3}>
          {randomIngredients.map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {ingredient}
                    </Typography>
                    <Button size="small" color="primary" href="/browse-ingredients">
                      View Ingredient
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
