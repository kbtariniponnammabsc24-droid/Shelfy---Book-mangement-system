// All communication with the Express backend lives here (uses fetch).
const API_URL = "http://localhost:5000/api/books";

// Reads the response; throws an Error with the server's message if it failed.
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

// GET all books
export async function getBooks() {
  return handleResponse(await fetch(API_URL));
}

// GET one book
export async function getBook(id) {
  return handleResponse(await fetch(`${API_URL}/${id}`));
}

// POST - create a book
export async function createBook(book) {
  return handleResponse(
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    })
  );
}

// PUT - update a book
export async function updateBook(id, book) {
  return handleResponse(
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    })
  );
}

// DELETE - remove a book
export async function deleteBook(id) {
  return handleResponse(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}
