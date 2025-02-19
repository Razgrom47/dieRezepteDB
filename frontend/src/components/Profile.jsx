/* eslint-disable react/prop-types */
import { Box, Typography, Avatar, Paper, Divider, Button, Grid, Card, CardContent } from '@mui/material';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
// ✅ handleLogout muss außerhalb der Profile-Komponente sein
const handleLogout = () => {
  document.cookie = "authToken="; 
  window.location.href = "/login"; // ⬅️ Nutzer nach dem Logout umleiten
};

const Profile = ({profile, profileMeals, profileIngredients}) => {
  return (
    <Box sx={{ margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Avatar
            alt={profile?.username}
            sx={{ width: 120, height: 120, marginRight: 3 }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {profile?.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>Password:</strong> **********
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>Country:</strong> {profile?.country}
            </Typography>
            <Button onClick={handleLogout}  sx={{martinTop:"3.75rem", color: '#98FF98'}}> <LogoutTwoToneIcon/> Log Out </Button>
          </Box>
        </Box>

        <Divider sx={{ marginBottom: 4 }} />

        {/* Favorite Meals Section */}
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Favorite Meals
        </Typography>
        <Button variant="contained" color="primary" href="/profile/meals" sx={{ background: '#98FF98', marginBottom: 3 }}>
          Browse All Favorite Meals
        </Button>
        <Grid container spacing={3}>
          {profileMeals?.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {meal.strMeal}
                    </Typography>
                    <Button size="small" color="primary" href={"/meal?mealQuery="+meal.strMeal.replace("&","%26")} sx={{ color: '#98FF98', hover:{color:'000'}}}>
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
        <Button variant="contained" color="primary" href="/profile/ingredients" sx={{ background: '#98FF98', marginBottom: 3 }}>
          Browse All Favorite Ingredients
        </Button>

        <Grid container spacing={3}>
          {profileIngredients?.map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '16px' }}>
                      {ingredient.strIngredient}
                    </Typography>
                    <Button size="small" color="primary" href={"/ingredient?ingredientQuery="+ingredient.strIngredient} sx={{color: '#98FF98'}}>
                      View Ingredient
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
