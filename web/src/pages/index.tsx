import React from "react";
import { useEffect, useState } from "react";
import CardSection from "../components/CardSection";
import getCards from "../services/getCards";

const categories = [
  {
    title: "Commons",
    id: "commons",
    rarityName: "Common",
  },
  {
    title: "Rares",
    id: "rares",
    rarityName: "Rare",
  },
  {
    title: "Epic",
    id: "epic",
    rarityName: "Epic",
  },
  {
    title: "Legendary",
    id: "legendary",
    rarityName: "Legendary",
  },
  {
    title: "Champions",
    id: "champions",
    rarityName: "Champion",
  },
];

export default function Index() {
  const [cards, setCards] = useState([] as Card[]);
  useEffect(() => {
    getCards().then((data) => {
      setCards(data);
    });
  }, []);
  return (
    <div>
      <h1>Clash Royale Cards</h1>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <h2>{category.title}</h2>
            <CardSection 
              cards={
                cards
                .filter((card) => card.rarity === category.rarityName)
              } 
            />
          </div>
        );
      })}
    </div>
  );
}
