import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useEffect, useState } from 'react';
import MealsListe from './Mealsliste';
import IngredientsListe from './IngredientListe';
import demoTheme from './Theme';
import { Box } from '@mui/material';
import DinnerDiningTwoToneIcon from '@mui/icons-material/DinnerDiningTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Profile from './Profile';
import Home from './Home';

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
  { segment: 'home', title: 'Home', icon: <CottageTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'profile', title: 'Profile', icon: <AccountCircleTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals', title: 'Meals', icon: <DinnerDiningTwoToneIcon sx={{ color: "#98FF98" }} /> },
  { segment: 'ingredients', title: 'Ingredients', icon: <ShoppingCartIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals/filter', title: 'MealFilter', icon: <TuneTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals/ingredient', title: 'MealFilterByIngredients', icon: <MenuBookTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals/area', title: 'MealFilterByArea', icon: <PublicTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals/tag', title: 'MealFilterByTag', icon: <LoyaltyTwoToneIcon sx={{ color: "#98FF98" }}/> },
  { segment: 'meals/category', title: 'MealFilterByCategory', icon: <CategoryTwoToneIcon sx={{ color: "#98FF98" }}/> },
];

function DemoPageContent({ pathname }) {
  const [meals, setMeals] = useState();
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    if (pathname === '/meals') {
      fetch('http://127.0.0.1:7700/meals/')
        .then((response) => response.json())
        .then((data) => setMeals(data.meals))
        .catch((error) => console.error('Error fetching meals:', error));
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/ingredients') {
      fetch('http://127.0.0.1:7700/ingredients/')
        .then((response) => response.json())
        .then((data) => setIngredients(data.ingredients))
        .catch((error) => console.error('Error fetching ingredients:', error));
    }
  }, [pathname]);

  return (
    <>
      <Box sx={{justifyItems:"center" }}>
        <Typography sx={{ fontSize: "2.125rem"}}>Dashboard {pathname === '/meals' && "Meals"}{pathname === '/ingredients' && "Ingredients"}</Typography>
      </Box>
      {pathname === '/home' && <Home/>}
      {pathname === '/meals' && <MealsListe meals={meals} />}
      {pathname === '/ingredients' && <IngredientsListe ingredients={ingredients} />}
      {pathname === '/profile' && <Profile />}
    </>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="search" sx={{ display: { xs: 'inline', md: 'none' } }}>
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  return (
    <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
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

function DashboardLayoutSlots(props) {
  const { window } = props;
  const router = useDemoRouter('/home');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;
