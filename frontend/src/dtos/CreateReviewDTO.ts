import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';

export type CreateReviewDTO = Omit<ReviewInterface, 'id' | 'createdAt'>;
