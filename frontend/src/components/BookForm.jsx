// Reusable form used for BOTH adding (AddBook page) and editing (BookDetails page).
// Props: initialData (pre-filled values), onSubmit (callback), submitLabel, onCancel (optional)
import { useState } from "react";
import { CATEGORIES } from "./CategoryFilter.jsx";

const emptyForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  publishedYear: "",
  image: ""
};

function BookForm({ initialData, onSubmit, submitLabel, onCancel }) {
  // useState: form inputs (controlled inputs), validation errors, submit state
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // onChange handler shared by every input (uses the input's name attribute)
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Returns an object like { title: "Title is required" }
  function validate() {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.category) newErrors.category = "Please choose a category";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!(Number(formData.price) > 0)) newErrors.price = "Price must be greater than 0";
    const year = Number(formData.publishedYear);
    if (!Number.isInteger(year) || year < 1000 || year > currentYear) {
      newErrors.publishedYear = `Enter a valid year (1000 - ${currentYear})`;
    }
    return newErrors;
  }

  // onSubmit handler: validate, then give the data to the parent
  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    await onSubmit({
      ...formData,
      price: Number(formData.price),
      publishedYear: Number(formData.publishedYear)
    });
    setSaving(false);
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <label>Title
        <input name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <label>Author
        <input name="author" value={formData.author} onChange={handleChange} />
        {errors.author && <span className="error">{errors.author}</span>}
      </label>

      <label>Category
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </label>

      <label>Description
        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} />
        {errors.description && <span className="error">{errors.description}</span>}
      </label>

      <div className="form-row">
        <label>Price (₹)
          <input name="price" type="number" value={formData.price} onChange={handleChange} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>Published Year
          <input name="publishedYear" type="number" value={formData.publishedYear} onChange={handleChange} />
          {errors.publishedYear && <span className="error">{errors.publishedYear}</span>}
        </label>
      </div>

      <label>Image URL
        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
