import { Book } from "../models/book.model.ts";
import { BookRepository } from "../repositories/book.repository.ts";

export class BookService {
  private repository = new BookRepository();

  getAllBooks(): Book[] {
    return this.repository.getAll();
  }

  getBookById(id: number): Book | undefined {
    return this.repository.getById(id);
  }

  createBook(book: Book): Book {
    return this.repository.add(book);
  }

  updateBook(id: number, bookData: Partial<Book>): Book | null {
    return this.repository.update(id, bookData);
  }
  deleteBook(id: number): boolean {
    return this.repository.delete(id);
  }
}