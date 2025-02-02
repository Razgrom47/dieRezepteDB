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
import Impressum from './Impressum';
import Datenschutz from "./Datenschutz";
import Ingredient from "./Ingredient";
import GavelTwoToneIcon from '@mui/icons-material/GavelTwoTone';
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone';

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
  { segment: "datenschutz", title: 'Datenschutz', icon: <LocalPoliceTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "impressum", title: 'Impressum', icon: <GavelTwoToneIcon sx={{ color: "#98FF98" }} />},
  { segment: "login", title: 'Login', icon: <LoginTwoToneIcon sx={{ color: "#98FF98" }} />},
];


function DemoPageContent() {
  const [meals, setMeals] = useState();
  const [ingredients, setIngredients] = useState();
  const [home_meals, setHomeMeals] = useState();
  const [home_ingredients, setHomeIngredients] = useState();
  const [meal, setMeal] = useState();
  const [ingredient, setIngredient] = useState();
  const [areas, setAreas] = useState();
  const [profile, setProfile] = useState();
  const [profileMeals, setProfileMeals] = useState();
  const [profileIngredients, setProfileIngredients] = useState();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search); 
  const query = searchParams.get("searchquery");
  const mealQuery = searchParams.get("mealQuery");
  const ingredientQuery = searchParams.get("ingredientQuery");
  const ingredientsSearchquery = searchParams.get("ingredientsSearchquery");
  const param = searchParams.get("param");

  
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };
  // Effect zum Abrufen der Mahlzeiten basierend auf den Parametern
  useEffect(() => {
    
    if (pathname === '/meals') {
      const token = getCookie('authToken'); // Token aus Cookie holen
    
      let url = 'http://192.168.178.86:7700/meals/';
      
      if (query?.length > 0) {
        switch (param) {
          case 'Area':
            url = `http://192.168.178.86:7700/meals/area/${query}`;
            break;
          case 'Category':
            url = `http://192.168.178.86:7700/meals/category/${query}`;
            break;
          case 'Ingredient':
            url = `http://192.168.178.86:7700/meals/ingredient/${query}`;
            break;
          case 'Tag':
            url = `http://192.168.178.86:7700/meals/tag/${query}`;
            break;
          case 'Name':
            url = `http://192.168.178.86:7700/meals/name/${query}`;
            break;
          default:
            break;
        }
      }

      fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Setze den Authorization-Header
          },
        }
      )
        .then(response => response.json())
        .then(data => setMeals(data.meals.filtered || data.meals))
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname, query, param]);

  // Effect zum Abrufen der Zutaten
  useEffect(() => {
    if (pathname === '/ingredients') {
      const token = getCookie('authToken'); // Token aus Cookie holen
    
      const ingredientsUrl = ingredientsSearchquery?.length > 0
        ? `http://192.168.178.86:7700/ingredients/name/${ingredientsSearchquery}`
        : 'http://192.168.178.86:7700/ingredients/';

      fetch(ingredientsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => setIngredients(data.ingredients.filtered || data.ingredients))
        .catch(error => console.error('Error fetching ingredients:', error));
    }
  }, [pathname, ingredientsSearchquery]);

  // Effect für die Home-Seite mit den neuesten Zutaten und Mahlzeiten
  useEffect(() => {
    if (pathname === '/home') {
      const token = getCookie('authToken'); // Token aus Cookie holen
      fetch('http://192.168.178.86:7700/ingredients/random/6', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => setHomeIngredients(data.ingredients.filtered))
        .catch(error => console.error('Error fetching ingredients:', error));

      fetch('http://192.168.178.86:7700/meals/latests/6', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => setHomeMeals(data.meals.filtered))
        .catch(error => console.error('Error fetching meals:', error));
      
      fetch('http://192.168.178.86:7700/areas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => setAreas(data.areas))
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname]);
  
  useEffect(() => {
    if (pathname === '/profile') {
      const token = getCookie('authToken'); // Token aus Cookie holen
      fetch('http://192.168.178.86:7700/profile/get/meals/last/3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setProfileMeals(data.meals.filtered); console.log(data)})
        .catch(error => console.error('Error fetching meals:', error));

      fetch('http://192.168.178.86:7700/profile/get/ingredients/last/3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setProfileIngredients(data.ingredients.filtered); console.log(data)})
        .catch(error => console.error('Error fetching meals:', error));
      
      fetch('http://192.168.178.86:7700/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setProfile(data.profile); console.log(data);})
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname]);
  useEffect(() => {
    if (pathname === '/profile/meals') {
      const token = getCookie('authToken'); // Token aus Cookie holen
      fetch('http://192.168.178.86:7700/profile/get/meals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setProfileMeals(data.meals.filtered); console.log(data)})
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname]);
  
  useEffect(() => {
    if (pathname === '/profile/ingredients') {
      const token = getCookie('authToken'); // Token aus Cookie holen
      fetch('http://192.168.178.86:7700/profile/get/ingredients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setProfileIngredients(data.ingredients.filtered); console.log(data)})
        .catch(error => console.error('Error fetching ingredients:', error));
    }
  }, [pathname]);

  // Effekt zum Abrufen einer Mahlzeit bei Filteransicht
  useEffect(() => {
    if (pathname === '/meal') {
      fetch('http://192.168.178.86:7700/meal/name/'+mealQuery)
        .then(response => response.json())
        .then(data => setMeal(data.meal))
        .catch(error => console.error('Error fetching meal:', error));
    }
  }, [pathname, mealQuery]);
  
  useEffect(() => {
    if (pathname === '/ingredient') {
      fetch('http://192.168.178.86:7700/ingredient/name/'+ingredientQuery)
        .then(response => response.json())
        .then(data =>{ setIngredient(data.ingredient); })
        .catch(error => console.error('Error fetching meal:', error));
    }
  }, [pathname, ingredientQuery]);
  
  useEffect(() => {
    if (ingredient) {
      const token = getCookie('authToken'); // Token aus Cookie holen
    
      fetch('http://192.168.178.86:7700/meals/ingredient/'+ingredient?.strIngredient, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Setze den Authorization-Header
        },
      })
        .then(response => response.json())
        .then(data => {setMeals(data.meals.filtered); console.log(data.meals.filtered);})
        .catch(error => console.error('Error fetching meals:', error));
    }
  }, [pathname, ingredient]);

  return (
    <Box sx={{ justifyItems: "center" }}>

      <Typography sx={{ fontSize: "2.125rem" }}>
        {pathname === '/meals' && "Meals"}
        {pathname === '/meal' && "Meal"}
        {pathname === '/ingredients' && "Ingredients"}
        {pathname === '/ingredient' && "Ingredient"}
        {pathname === '/home' && "Home Page"}
        {pathname === '/ingredient/filter' && "Ingredient"}
        {pathname === '/profile' && "Profile"}
      </Typography>
      
      {/* Routing für Home-Seite */}
      {pathname === '/home' && <Home areas={areas} latestMeals={home_meals} randomIngredients={home_ingredients} />}
      
      {/* Routing für Meals-Liste mit optionalen Filtern */}
      {pathname === '/meals' && <MealsListe meals={meals} />}
      {pathname === '/meals/area' && <MealsListe meals={meals} />}
      {pathname === '/meals/category' && <MealsListe meals={meals} />}
      {pathname === '/meals/ingredient' && <MealsListe meals={meals} />}
      {pathname === '/meals/name' && <MealsListe meals={meals} />}
      
      {/* Routing für Meal-Details */}
      {pathname === '/meal' && <Meal meal={meal} />}
      
      {/* Routing für Ingredient-Details */}
      {pathname === '/ingredient' && <Ingredient ingredient={ingredient} meals={meals} />}
      
      {/* Routing für Ingredients-Liste */}
      {pathname === '/ingredients' && <IngredientsListe ingredients={ingredients} />}
      
      {/* Routing für Profile-Seite */}
      {pathname === '/profile' && <Profile profile={profile} profileMeals={profileMeals} profileIngredients={profileIngredients} />}
      {pathname === '/profile/meals' && <MealsListe meals={profileMeals}/>}
      {pathname === '/profile/ingredients' && <IngredientsListe ingredients={profileIngredients} />}
      
      {/* Routing für Profile-Seite */}
      {pathname === '/datenschutz' && <Datenschutz />}

      {/* Routing für Profile-Seite */}
      {pathname === '/impressum' && <Impressum />}
    </Box>
  );
}



function ToolbarActionsSearch() {
  return (
      <ThemeSwitcher sx={{color:"#98FF98"}} />
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
              <Route path="/meal" element={<DemoPageContent />} />
              <Route path="/ingredient" element={<DemoPageContent />} />
              <Route path="/ingredients" element={<DemoPageContent />} />
              <Route path="/profile" element={<DemoPageContent />} />
              <Route path="/profile/meals" element={<DemoPageContent />} />
              <Route path="/profile/ingredients" element={<DemoPageContent />} />
              <Route path="/datenschutz" element={<DemoPageContent />} />
              <Route path="/impressum" element={<DemoPageContent />} />
            </Routes>
          </DashboardLayout>
        </AppProvider>
      </Router>
    );
  }

export default DashboardLayoutSlots;
