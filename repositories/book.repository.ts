import { Book } from "../models/book.model.ts";

let books: Book[] = [
  { id: 1, titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", isbn: "978-0618260263", datePublication: "1954-07-29" },
  { id: 2, titre: "Orgueil et Préjugés", auteur: "Jane Austen", isbn: "978-0141439518", datePublication: "1813-01-28" },
];

export class BookRepository {
  getAll(): Book[] {
    return books;
  }

  getById(id: number): Book | undefined {
    return books.find(book => book.id === id);
  }

  add(book: Book): Book {
    book.id = books.length ? books[books.length - 1].id + 1 : 1;
    books.push(book);
    return book;
  }

  update(id: number, updatedBook: Partial<Book>): Book | null {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;

    books[index] = { ...books[index], ...updatedBook };
    return books[index];
  }

  delete(id: number): boolean {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;

    books.splice(index, 1);
    return true;
  }
}