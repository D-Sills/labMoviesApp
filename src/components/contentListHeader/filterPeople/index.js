import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react"; // useState/useEffect redundant 

  const formControl = 
  {
    margin: 1,
    minWidth: 220,
  };
  
  export default function FilterPeople(props) {
    let categories = [
      {label: "Actor", value: "Acting"},
      {label: "Director", value: "Directing"},
    ];

    const handleChange = (e, type, value) => {
      e.preventDefault();
      props.onUserInput(type, value);
      props.setState(1);
    };
  
    const handleTextChange = (e, props) => {
      handleChange(e, "name", e.target.value);
    };

    const handleCategoryChange = (e) => {
      handleChange(e, "personType", e.target.value);
    };

  return (
    <Typography sx={{display: 'flex',alignItems: 'center',}}>
      <FormControl size="small" sx={formControl}>
        <InputLabel>Department</InputLabel>
        <Select
          labelId="department-label"
          id="department-select"
          defaultValue="Acting"
          value={props.personType}
          onChange={handleCategoryChange}
        >
          {categories.map((department) => {
            return (
              <MenuItem key={department.label} value={department.value}>
                {department.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        size="small"
        sx={formControl}
        id="filled-search"
        label="Search field"
        type="search"
        value={props.titleFilter}
        onChange={handleTextChange}
      />
      </Typography>
    );
}