import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';

export const reviewSeeder: ReviewInterface[] = [
  {
    id: 1,
    bookId: 1,
    rating: 5,
    comment: 'A timeless classic. Beautiful prose.',
    author: 'Jane Doe',
    createdAt: '2026-07-01T10:00:00.000Z',
  },
  {
    id: 2,
    bookId: 1,
    rating: 4,
    comment: 'Great story, a bit slow in the middle.',
    author: 'John Smith',
    createdAt: '2026-07-03T10:00:00.000Z',
  },
  {
    id: 3,
    bookId: 2,
    rating: 5,
    comment: 'Essential reading for every developer.',
    author: 'Alice Dev',
    createdAt: '2026-07-05T10:00:00.000Z',
  },
  {
    id: 4,
    bookId: 2,
    rating: 4,
    comment: 'Clear and practical advice.',
    author: 'Bob Coder',
    createdAt: '2026-07-08T10:00:00.000Z',
  },
  {
    id: 5,
    bookId: 3,
    rating: 5,
    comment: 'Mind-blowing perspective on human history.',
    author: 'Carol Reader',
    createdAt: '2026-07-11T10:00:00.000Z',
  },
];
