type CreateReviewInput = {
  cardId: number;
  review: string;
};

export default function createReview(input: CreateReviewInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...input, timestamp: Date.now()}),
  }).then((res) => res.json())
}