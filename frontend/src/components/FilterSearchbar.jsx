import { useState } from "react";
import { Stack, TextField, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterSearchbar() {
  const [ingredientsSearchquery, setIngredientsSearchquery] = useState(
    new URLSearchParams(window.location.search).get("ingredientSearchquery") || ""
  );

  const updateQueryParam = (newQuery) => {
    const url = new URL(window.location);
    url.searchParams.set("ingredientsSearchquery", newQuery);
    window.history.pushState({}, "", url);
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setIngredientsSearchquery(newQuery);
  };

  const handleSearchSubmit = () => {
    updateQueryParam(ingredientsSearchquery);
    window.location.reload();
  };


  return (
    <Stack direction="column" spacing={3} sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          value={ingredientsSearchquery}
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
