import { BookService } from "../services/book.service.ts";

const service = new BookService();

export class BookController {
  static getAll(ctx: Context) {
    ctx.response.body = service.getAllBooks();
  }

  static getById(ctx: Context) {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.response.status = 400;
      ctx.response.body = { message: "ID invalide" };
      return;
    }
    const book = service.getBookById(id);
    if (!book) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Livre non trouvé" };
      return;
    }
    ctx.response.body = book;
  }

  static async create(ctx: Context) {
    try {
      const book = await ctx.request.json();
      const newBook = service.createBook(book);
      ctx.response.status = 201;
      ctx.response.body = newBook;
    } catch (error) {
      console.error(error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur lors de la création du livre" };
    }
  }
  

  static async update(ctx: Context) {
    const id = Number(ctx.params.id);

    const existingBook = service.getBookById(id);
    if (!existingBook) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Livre non trouvé" };
      return;
    }
    const book = await ctx.request.json();
    const updatedBook = service.updateBook(id, bookData);

    if (updatedBook) {
      ctx.response.body = updatedBook;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Livre non trouvé" };
    }
  }

  static delete(ctx: Context) {
    const id = Number(ctx.params.id);
    const success = service.deleteBook(id);

    if (success) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Livre non trouvé" };
    }
  }
}