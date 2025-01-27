import { useState } from "react";
import { Stack, TextField, IconButton, Tooltip, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

export default function FilterSearchbar() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("searchquery") || ""
  );

  const [searchCategory, setSearchCategory] = useState(
    new URLSearchParams(window.location.search).get("param") || "Name"
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const updateQueryParam = (newQuery, newCategory) => {
    const url = new URL(window.location);
    url.searchParams.set("searchquery", newQuery);
    url.searchParams.set("param", newCategory);
    window.history.pushState({}, "", url);
  };

  const handleSearchSubmit = () => {
    updateQueryParam(query, searchCategory);
    window.location.reload();
    // Optionally, you can also trigger a fetch here to update the results
    // You might need to communicate with a parent component to trigger fetching based on URL changes
  };

  return (
    <Stack direction="column" spacing={3} sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      {/* Filter Select Section */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchCategory}
            label="Filter By"
            onChange={handleCategoryChange}
            sx={{
              borderRadius: '4px',
              '& .MuiInputBase-root': { height: '40px' },
            }}
          >
            <MenuItem value="Category"><CategoryTwoToneIcon sx={{ color: "#98FF98", ml: 1 }} /> Category</MenuItem>
            <MenuItem value="Area"><PublicTwoToneIcon sx={{ color: "#98FF98", ml: 1 }} /> Area</MenuItem>
            <MenuItem value="Tag"><LoyaltyTwoToneIcon sx={{ color: "#98FF98", ml: 1 }} /> Tag</MenuItem>
            <MenuItem value="Ingredient"><MenuBookTwoToneIcon sx={{ color: "#98FF98", ml: 1 }} /> Ingredient</MenuItem>
            <MenuItem value="Name"><MenuBookTwoToneIcon sx={{ color: "#98FF98", ml: 1 }} /> Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Search Section */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              paddingRight: 0,
            },
            '& .MuiInputLabel-root': {
              fontSize: '1rem',
              color: '#98FF98',
            },
          }}
        />
        <Tooltip title="Search" enterDelay={1000}>
          <IconButton
            type="button"
            aria-label="search"
            onClick={handleSearchSubmit}
            sx={{
              backgroundColor: '#98FF98',
              '&:hover': {
                backgroundColor: '#81E681',
              },
              borderRadius: '50%',
              padding: 1,
            }}
          >
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
