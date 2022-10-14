export default function getCard(id) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
}