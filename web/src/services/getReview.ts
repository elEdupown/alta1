export default function getReview(id) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?card_id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(input),
    }).then((res) => res.json())
}