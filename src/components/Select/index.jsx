import "./styles.css";

function Select({ value, onChange, options, defaultLabel }) {
  return (
    <div className="select-wrapper">
      <select 
        className="custom-select" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        {defaultLabel && <option value="All">{defaultLabel}</option>}
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;