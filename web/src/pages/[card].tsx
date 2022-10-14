import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import getCard from "../services/getCard"

export default function Card({id}){
    const [card, setCard] = useState([])
    useEffect(() => {
        getCard(id).then((data) => {
            setCard(data)
        })
    }, [])

    return <div>
        <h2>{card.name} - {card.rarity}</h2>
        <p>{card.description}</p>
        <p>{card.elixir} </p>
    </div>
    // perdón rolo te fallé :(
}