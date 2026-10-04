// Controlled input. The parent (Home) owns the value; this component only
// shows it and reports changes back with the onChange callback prop.
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search by title or author..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SearchBar;
