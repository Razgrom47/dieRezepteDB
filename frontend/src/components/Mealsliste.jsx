import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react"
import RecipeReviewCard from "./Card"

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

export default function Mealliste(){
    const [meals, setMeals] = useState(new Map())

    useEffect(() => {
        fetch('http://127.0.0.1:7700/meals/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        })
        .catch(error => {
            console.error('Fehler beim Abrufen:', error);
        })
        .then((data) => {
            setMeals(data);
        });
    }, []);

  //   // Liste
  //   <Box sx={{ flexGrow: 1 }}>
  //   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  //     {meals.map( meal => (
  //       <Grid key={meal} size={{ xs: 2, sm: 4, md: 4 }}>
  //         <Item>
  //           <RecipeReviewCard meal={meal}></RecipeReviewCard>
  //           </Item>
  //       </Grid>
  //     ))}
  //   </Grid>
  // </Box>

}

