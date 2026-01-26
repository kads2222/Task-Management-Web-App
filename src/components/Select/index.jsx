import { FormControl, Select as MuiSelect, MenuItem } from "@mui/material";
import "./styles.css";

/* 
  reusable Select component using Material-UI.
  can be used in normal forms or inside a sidebar.
  props:
    - value: current selected value
    - onChange: function to update parent state
    - options: array of options to display
    - defaultLabel: optional placeholder/default option label
    - isSidebar: boolean to apply sidebar-specific styles
*/
function Select({ value, onChange, options, defaultLabel, isSidebar }) {
  return (
    <FormControl className={`mui-select-wrapper ${isSidebar ? "sidebar-select" : ""}`}>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          // show placeholder if value is empty or "All"
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

          /* outline styles for different states */
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

          /* select content alignment */
          "& .MuiSelect-select": {
            padding: "1rem 1.6rem",
            display: "flex",
            alignItems: "center",
          },

          /* arrow icon color */
          "& .MuiSvgIcon-root": {
            color: isSidebar ? "white" : "black",
          },
        }}
      >
        {/* pptional default placeholder */}
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

        {/* map options into MenuItem components */}
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
