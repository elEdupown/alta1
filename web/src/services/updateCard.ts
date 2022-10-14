export default function updateCard(input) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    }).then((res) => res.json())
    }