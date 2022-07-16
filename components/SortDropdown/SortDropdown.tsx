import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortDropdownProps {
  sortValue: string;
  onChangeValue: (e: SelectChangeEvent) => void;
}

const SortDropdown: FC<SortDropdownProps> = ({ sortValue, onChangeValue }) => {
  return (
    <FormControl
      variant="filled"
      sx={{
        background: "#ffd814",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          color: "red",
          fontWeight: 500,
        }}
      >
        Sort by
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Sort by"
        sx={{
          color: "#000",
          fontWeight: 700,
        }}
        MenuProps={{
          sx: {
            ".MuiPaper-root": {
              background: "none",
              boxShadow: "5px 10px 20px 1px rgba(0,0,0,0.5)",
            },
            ".MuiMenu-list": {
              backgroundColor: "#fff",
              borderRadius: "5px",
            },
            "&& .Mui-selected": {
              background: "hsl(0, 0%, 85%)",
            },
            ".MuiMenuItem-root": {
              color: "#000",
              fontWeight: 500,
              transition: "background 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "hsl(0, 0%, 85%)",
              },
            },
          },
        }}
        onChange={onChangeValue}
        value={sortValue}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-asc">Price - Lowest</MenuItem>
        <MenuItem value="price-desc">Price - Highest</MenuItem>
        <MenuItem value="ratings-asc">Ratings - Lowest</MenuItem>
        <MenuItem value="ratings-desc">Ratings - Highest</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
