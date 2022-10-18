export default function deleteReview(id: string) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
}