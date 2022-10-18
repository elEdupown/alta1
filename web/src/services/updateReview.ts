export default function updateReview(id: string, review: string) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id, review: review}),
    }).then((res) => res.json())
}