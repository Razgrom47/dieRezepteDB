import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useEffect, useState } from 'react';
import MealsListe from './Mealsliste';
import IngredientsListe from './IngredientListe';
import demoTheme from './Theme';
import { Box } from '@mui/material';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Profile from './Profile';
import Home from './Home';
import Meal from './Meal';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Login from "./Login"
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';

// Define the colors for primary, secondary, and third colors
// const primaryDark = '#98FF98'; // light Green for dark mode
// const primaryDark = '#50C878'; // Emerald Green for dark mode
// const primaryLight = '#1B5235'; // Dark Green for light mode
// const secondaryDark = '#000404'; // Charcoal Black for dark mode
// const secondaryLight = '#DDEAD1'; // Pale Beige for light mode
// const accentDark = '#08354C'; // Dark Blue for dark mode
// const accentLight = '#4A7DA8'; // Sky Blue for light mode
// const neutral = '#BDC2D6'; // Light Gray/Blue


const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { kind: 'divider', title: 'Main items' },
  { segment: "home", title: 'Home', icon: <CottageTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "profile", title: 'Profile', icon: <AccountCircleTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "meals", title: 'Meals', icon: <DinnerDiningTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "ingredients", title: 'Ingredients', icon: <ShoppingCartIcon sx={{ color: "#98FF98" }} />},
  { segment: "meal/filter", title: 'MealFilter', icon: <TuneTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "login", title: 'Login', icon: <LoginTwoToneIcon sx={{ color: "#98FF98" }} />},
];

function DemoPageContent() {
  const [meals, setMeals] = useState();
  const [ingredients, setIngredients] = useState();
  const [home_meals, setHomeMeals] = useState();
  const [home_ingredients, setHomeIngredients] = useState();
  const [meal, setMeal] = useState();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search); 
  const query = searchParams.get("searchquery");
  const ingredientsSearchquery = searchParams.get("ingredientsSearchquery");
  const param = searchParams.get("param");
  
  // Effect zum Abrufen der Mahlzeiten basierend auf den Parametern
  useEffect(() => {
    if (pathname === '/meals') {
      let url = 'http://127.0.0.1:7700/meals/';
      
      if (query?.length > 0) {
        switch (param) {
          case 'Area':
            url = `http://127.0.0.1:7700/meals/area/${query}`;
            break;
          case 'Category':
            url = `http://127.0.0.1:7700/meals/category/${query}`;
            break;
          case 'Ingredient':
            url = `http://127.0.0.1:7700/meals/ingredient/${query}`;
            break;
          case 'Tag':
            url = `http://127.0.0.1:7700/meals/tag/${query}`;
            break;
          case 'Name':
            url = `http://127.0.0.1:7700/meals/name/${query}`;
            break;
          default:
            break;
        }
      }

      fetch(url)
        .then(response => response.json())
        .then(data => setMeals(data.meals.filtered || data.meals))
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname, query, param]);

  // Effect zum Abrufen der Zutaten
  useEffect(() => {
    if (pathname === '/ingredients') {
      const ingredientsUrl = ingredientsSearchquery?.length > 0
        ? `http://127.0.0.1:7700/ingredients/name/${ingredientsSearchquery}`
        : 'http://127.0.0.1:7700/ingredients/';

      fetch(ingredientsUrl)
        .then(response => response.json())
        .then(data => setIngredients(data.ingredients.filtered || data.ingredients))
        .catch(error => console.error('Error fetching ingredients:', error));
    }
  }, [pathname, ingredientsSearchquery]);

  // Effect für die Home-Seite mit den neuesten Zutaten und Mahlzeiten
  useEffect(() => {
    if (pathname === '/home') {
      fetch('http://127.0.0.1:7700/ingredients/random/6')
        .then(response => response.json())
        .then(data => setHomeIngredients(data.ingredients.filtered))
        .catch(error => console.error('Error fetching ingredients:', error));

      fetch('http://127.0.0.1:7700/meals/latests/6')
        .then(response => response.json())
        .then(data => setHomeMeals(data.meals.filtered))
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname]);

  // Effekt zum Abrufen einer Mahlzeit bei Filteransicht
  useEffect(() => {
    if (pathname === '/meal/filter') {
      fetch('http://127.0.0.1:7700/meals/id/848484')
        .then(response => response.json())
        .then(data => setMeal(data.meal))
        .catch(error => console.error('Error fetching meal:', error));
    }
  }, [pathname]);

  return (
    <Box sx={{ justifyItems: "center" }}>

      <Typography sx={{ fontSize: "2.125rem" }}>
        {pathname === '/meals' && "Meals"}
        {pathname === '/meal/filter' && "Meal"}
        {pathname === '/ingredients' && "Ingredients"}
        {pathname === '/home' && "Home Page"}
        {pathname === '/ingredient/filter' && "Ingredient"}
        {pathname === '/profile' && "Profile"}
      </Typography>
      
      {/* Routing für Home-Seite */}
      {pathname === '/home' && <Home latestMeals={home_meals} randomIngredients={home_ingredients} />}
      
      {/* Routing für Meals-Liste mit optionalen Filtern */}
      {pathname === '/meals' && <MealsListe meals={meals} />}
      {pathname === '/meals/area' && <MealsListe meals={meals} />}
      {pathname === '/meals/category' && <MealsListe meals={meals} />}
      {pathname === '/meals/ingredient' && <MealsListe meals={meals} />}
      {pathname === '/meals/name' && <MealsListe meals={meals} />}
      
      {/* Routing für Meal-Details bei Filteransicht */}
      {pathname === '/meal/filter' && <Meal meal={meal} />}
      
      {/* Routing für Ingredients-Liste */}
      {pathname === '/ingredients' && <IngredientsListe ingredients={ingredients} />}
      
      {/* Routing für Ingredient-Filter */}
      {/*pathname === '/ingredient/filter' && <IngredientDetail />}
      
      {/* Routing für Profile-Seite */}
      {pathname === '/profile' && <Profile />}
    </Box>
  );
}



function ToolbarActionsSearch() {
  return (
      <ThemeSwitcher />
  );
}

function SidebarFooter({ mini }) {
  return (
    <>
    <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
    </>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Chip size="small" label="dieRezepteDB" color="#98FF98" />
      <Tooltip title="Connected to production">
        <VerifiedTwoToneIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

function DashboardLayoutSlots() {
    return (
      <Router>
        <AppProvider navigation={NAVIGATION} theme={demoTheme}>
          
          <DashboardLayout
            slots={{
              appTitle: CustomAppTitle,
              toolbarActions: ToolbarActionsSearch,
              sidebarFooter: SidebarFooter,
            }}>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/home" element={<DemoPageContent />} />
              <Route path="/meals" element={<DemoPageContent />} />
              <Route path="/ingredients" element={<DemoPageContent />} />
              <Route path="/meal/filter" element={<DemoPageContent />} />
              <Route path="/profile" element={<DemoPageContent />} />
            </Routes>
          </DashboardLayout>
        </AppProvider>
      </Router>
    );
  }

export default DashboardLayoutSlots;
