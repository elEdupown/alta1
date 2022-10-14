export default function createReview(input) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((res) => res.json())
}