export default function updateReview(input) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    }).then((res) => res.json())
    }