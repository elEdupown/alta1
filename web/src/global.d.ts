type Card = {
  arena: number;
  description: string; 
  elixir: number;
  id: number;
  key: string;
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Champion";
  sc_key: string;
  type: string;
  _id: string;
};

type Review = { 
  _id: string; 
  cardId: number; 
  review: string, 
  timestamp: number 
};

type CardQuery = { 
  cardData: Card; 
  reviews: Review[] 
};
