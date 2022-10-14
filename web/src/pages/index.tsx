import Link from "next/link"
import React from "react"
import { useEffect, useState } from "react"
import getCards from "../services/getCards"
import getCard from "../services/getCard"

export default function Index(){
    const [cards, setCards] = useState([])
    useEffect(() => {
        getCards().then((data) => {
            setCards(data)
        })
    }, [])
    // console.log(cards)
    return <div>
        <h2>Commons</h2>
        <ul>
        {cards.filter(card=>card.rarity=="Common").map((card) => {
            return <Link href="./cards"><li key={card.id}>{card.name}</li></Link>
        })}
        </ul>

        <h2>Rares</h2>
        <ul>
        {cards.filter(card=>card.rarity=="Rare").map((card) => {
            return <li key={card.id}>{card.name}</li>
        })}
        </ul>

        <h2>Epic</h2>
        <ul>
        {cards.filter(card=>card.rarity=="Epic").map((card) => {
            return <li key={card.id}>{card.name}</li>
        })}
        </ul>

        <h2>Legendary</h2>
        <ul>
        {cards.filter(card=>card.rarity=="Legendary").map((card) => {
            return <li key={card.id}>{card.name}</li>
        })}
        </ul>

        <h2>Champions</h2>
        <ul>
        {cards.filter(card=>card.rarity=="Champion").map((card) => {
            return <li key={card.id}>{card.name}</li>
        })}
        </ul>
    </div>
}