export default function createCard(input) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((res) => res.json())
}