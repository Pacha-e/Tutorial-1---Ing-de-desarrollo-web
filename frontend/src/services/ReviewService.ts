import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO.js';
import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';
import { useReviewStore } from '@/stores/reviewstore.js';

export class ReviewService {
  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  static createReview(review: CreateReviewDTO): void {
    const reviews = useReviewStore().reviews;
    // Same id strategy as BookService: highest id in use plus one.
    const id = reviews.reduce((max, current) => Math.max(max, current.id), 0) + 1;

    reviews.push({ id, ...review, createdAt: new Date().toISOString() });
  }
}
