export default function getReview(input) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${input.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    }).then((res) => res.json())
}