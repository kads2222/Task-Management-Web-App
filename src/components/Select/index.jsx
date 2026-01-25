import { FormControl, Select as MuiSelect, MenuItem } from "@mui/material";
import "./styles.css";

function Select({ value, onChange, options, defaultLabel, isSidebar }) {
  return (
    <FormControl className={`mui-select-wrapper ${isSidebar ? "sidebar-select" : ""}`}>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (selected === "All" || !selected) {
            return <span className="select-placeholder">{defaultLabel || "Select"}</span>;
          }
          return selected;
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: isSidebar ? "blue" : "#fff",
              "& .MuiList-root": { padding: 0 },
            },
          },
        }}
        sx={{
          height: "4rem",
          fontSize: "1.4rem",
          borderRadius: "8px",
          backgroundColor: isSidebar ? "blue" : "#fff",
          color: isSidebar ? "white" : "black",
          
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: isSidebar ? "rgba(255, 255, 255, 0.5)" : "#d1d5db", 
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: isSidebar ? "white" : "blue", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: isSidebar ? "white" : "blue", 
            borderWidth: "2px", 
          },

          "& .MuiSelect-select": {
            padding: "1rem 1.6rem",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiSvgIcon-root": {
            color: isSidebar ? "white" : "black",
          },
        }}
      >
        {defaultLabel && (
          <MenuItem
            value="All"
            sx={{
              fontSize: "1.4rem",
              backgroundColor: isSidebar ? "blue" : "#fff",
              color: isSidebar ? "white" : "black",
              "&:hover": { backgroundColor: "#3b82f6", color: "white" },
              "&.Mui-selected": { backgroundColor: "white !important", color: "blue" },
            }}
          >
            {defaultLabel}
          </MenuItem>
        )}

        {options.map((opt, i) => (
          <MenuItem
            key={i}
            value={opt}
            sx={{
              fontSize: "1.4rem",
              backgroundColor: isSidebar ? "blue" : "#fff",
              color: isSidebar ? "white" : "black",
              "&:hover": { backgroundColor: "#3b82f6", color: "white" },
              "&.Mui-selected": { backgroundColor: "white !important", color: "blue" },
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;