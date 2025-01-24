import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import MealRecipeReviewCard from "./MealCard"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function MealsListe({meals}){
return (
   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
   {meals?.map(meal => (
     <Grid key={meal.idMeal} size={{ xs: 2, sm: 4, md: 4 }}>
       <Item>
        <MealRecipeReviewCard key={meal.idMeal} meal={meal}></MealRecipeReviewCard>
       </Item>
     </Grid>
   ))}
 </Grid>
  )

}

