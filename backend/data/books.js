// Simple data layer: an array of books kept in memory.
// (Data resets to these sample books whenever the server restarts.)
const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", description: "A shepherd boy travels from Spain to Egypt in search of treasure and learns to follow his dreams.", price: 299, publishedYear: 1988, image: cover("9780062315007"), isFavourite: false },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-Help", description: "A practical guide to building good habits and breaking bad ones through tiny daily changes.", price: 499, publishedYear: 2018, image: cover("9780735211292"), isFavourite: true },
  { id: 3, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", description: "A young boy discovers he is a wizard and begins his first year at Hogwarts.", price: 399, publishedYear: 1997, image: cover("9780590353427"), isFavourite: false },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", description: "A story of wealth, love and illusion in 1920s America.", price: 249, publishedYear: 1925, image: cover("9780743273565"), isFavourite: false },
  { id: 5, title: "The Psychology of Money", author: "Morgan Housel", category: "Finance", description: "Timeless lessons on how behaviour, not intelligence, drives financial success.", price: 399, publishedYear: 2020, image: cover("9780857197689"), isFavourite: true },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", category: "Technology", description: "A handbook of agile software craftsmanship about writing readable, maintainable code.", price: 899, publishedYear: 2008, image: cover("9780132350884"), isFavourite: false },
  { id: 7, title: "Ikigai", author: "Héctor García", category: "Self-Help", description: "The Japanese secret to a long and happy life through finding your purpose.", price: 299, publishedYear: 2016, image: cover("9780143130727"), isFavourite: false },
  { id: 8, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", category: "Finance", description: "Lessons on financial independence from two very different father figures.", price: 349, publishedYear: 1997, image: cover("9781612680194"), isFavourite: false },
  { id: 9, title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", description: "The authorised biography of Apple's co-founder, based on over forty interviews.", price: 599, publishedYear: 2011, image: cover("9781451648539"), isFavourite: false },
  { id: 10, title: "Sapiens", author: "Yuval Noah Harari", category: "Non-Fiction", description: "A brief history of humankind, from the Stone Age to the modern world.", price: 549, publishedYear: 2011, image: cover("9780062316110"), isFavourite: false }
];

module.exports = books;
