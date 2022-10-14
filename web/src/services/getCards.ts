export default function getCards() {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
}