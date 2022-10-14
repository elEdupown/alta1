export default function deleteReview(input) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${input.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    }).then((res) => res.json())
}