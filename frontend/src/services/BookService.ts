import type { BookInterface } from '@/interfaces/BookInterface';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';
import { useBookStore } from '@/stores/bookstore.js';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static getCategories(): string[] {
    return [...new Set(useBookStore().books.map((book) => book.category))];
  }

  static createBook(book: CreateBookDTO): void {
    const books = useBookStore().books;
    // The next id comes from the highest one in use, so removing a book never
    // produces a duplicated id.
    const id = books.reduce((max, current) => Math.max(max, current.id), 0) + 1;

    books.push({ id, ...book });
  }

  static deleteLastBook(): BookInterface | undefined {
    return useBookStore().books.pop();
  }
}
