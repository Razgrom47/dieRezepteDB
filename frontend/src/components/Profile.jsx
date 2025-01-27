import { Box, Typography, Avatar, Paper, Divider, Button, Grid, Card, CardContent } from '@mui/material';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
const Profile = () => {
  const user = {
    name: "John Doe",
    password: "**********",
    country: "USA",
    favoriteMeals: ["Spaghetti Carbonara", "Chicken Alfredo", "Sushi Rolls"],
    favoriteIngredients: ["Chicken", "Garlic", "Avocado"]
  };

  return (
    <Box sx={{ margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Avatar
            src={user.profilePicture}
            alt={user.name}
            sx={{ width: 120, height: 120, marginRight: 3 }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>Password:</strong> {user.password}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>Country:</strong> {user.country}
            </Typography>
            <Button sx={{martinTop:"3.75rem"}}> <LogoutTwoToneIcon/> Log Out </Button>
          </Box>
        </Box>

        <Divider sx={{ marginBottom: 4 }} />

        {/* Favorite Meals Section */}
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Favorite Meals
        </Typography>
        <Button variant="contained" color="primary" href="/browse-ingredients" sx={{ marginBottom: 3 }}>
          Browse All Favorite Meals
        </Button>
        <Grid container spacing={3}>
          {user.favoriteMeals.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
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

        <Divider sx={{ marginY: 4 }} />

        {/* Favorite Ingredients Section */}
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Favorite Ingredients
        </Typography>
        <Button variant="contained" color="primary" href="/browse-ingredients" sx={{ marginBottom: 3 }}>
          Browse All Favorite Ingredients
        </Button>

        <Grid container spacing={3}>
          {user.favoriteIngredients.map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {ingredient}
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

      </Paper>
    </Box>
  );
};

export default Profile;
