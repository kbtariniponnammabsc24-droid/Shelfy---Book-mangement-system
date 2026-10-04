// List of categories shared by the filter and by the book form.
export const CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Self-Help",
  "Technology",
  "Biography",
  "Finance"
];

// Dropdown. selected comes from the parent; onChange sends the new value up.
function CategoryFilter({ selected, onChange }) {
  return (
    <select
      className="category-filter"
      value={selected}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="All">All Categories</option>
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategoryFilter;
