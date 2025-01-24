import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import IngredientRecipeReviewCard from "./IngredientCard"

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

export default function IngredientsListe({ingredients}){
return (
   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
   {ingredients?.map(ingredient => (
     <Grid key={ingredient.idMeal} size={{ xs: 2, sm: 4, md: 4 }}>
       <Item><IngredientRecipeReviewCard key={ingredient.idIngredient} ingredient={ingredient}></IngredientRecipeReviewCard>
       </Item>
     </Grid>
   ))}
 </Grid>
  )

}

