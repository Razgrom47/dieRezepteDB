/* eslint-disable react/prop-types */
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MealRecipeReviewCard from "./MealCard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import demoTheme from './Theme';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use background.paper for light/dark mode
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary, // Use primary text color
  borderRadius: '12px', // Rounded corners for cards
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)', // Card hover effect
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
  },
}));

export default function MealsListe({ meals }) {
  return (
    <ThemeProvider
      theme={createTheme({
        ...demoTheme.cssVariables, // Use the demoTheme as the base
        ...demoTheme.palette, // Use the demoTheme as the base
        ...demoTheme.typography, // Use the demoTheme as the base
        
        colorSchemes: { light: true, dark: true },
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Box sx={{ width: '100%', padding: 3 }}> {/* Added padding for outer spacing */}
        <Grid container spacing={{ mobile: 2, tablet: 3, laptop: 4 }} justifyContent="center">
          {meals?.map((meal) => (
            <Grid key={meal.idMeal} item xs={12} sm={6} md={4} lg={3}>
              <Item>
                <MealRecipeReviewCard meal={meal} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
