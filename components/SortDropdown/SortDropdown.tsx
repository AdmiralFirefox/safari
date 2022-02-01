import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortDropdownProps {
  sortValue: string;
  onChangeValue: (e: SelectChangeEvent) => void;
}

const SortDropdown: FC<SortDropdownProps> = ({
  sortValue,
  onChangeValue,
}) => {
  return (
    <FormControl
      variant="filled"
      color="info"
      sx={{
        background: "#FFD814",
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          color: "#000",
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
        onChange={onChangeValue}
        value={sortValue}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-asc">Price - Ascending</MenuItem>
        <MenuItem value="price-desc">Price - Descending</MenuItem>
        <MenuItem value="ratings-asc">Ratings - Ascending</MenuItem>
        <MenuItem value="ratings-desc">Ratings - Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
