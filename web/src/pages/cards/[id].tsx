import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import createReview from "../../services/createReview";
import getCard from "../../services/getCard";
import getReview from "../../services/getReview";

// const StyledDetailedCard = styled.div({

type Review = { _id: string; cardId: number; review: string, timestamp: number };

type CardQuery = { cardData: Card; reviews: Review[] };




export default function Card() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<CardQuery>({ cardData: {} as Card, reviews: [] });
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    if (!id) return;

    Promise.all([getCard(id), getReview(id)]).then(
      ([cardData, reviewsData]: [Card, Review[]]) => {
        setData({cardData, reviews: reviewsData});
      }
    );
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReview({cardId: +id, review: newReview}).then(() => {
      setNewReview("");
      setData({...data, reviews: [...data.reviews, {cardId: +id, review: newReview, _id: new Date().toISOString(), timestamp: Date.now()}]})
    });
  }

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <section>
        <img
          src={`https://royaleapi.github.io/cr-api-assets/cards/${data.cardData.key}.png`}
        />
        <h2>
          {data.cardData.name} - {data.cardData.rarity}
        </h2>
        <p>{data.cardData.description}</p>
        <p>{data.cardData.elixir} </p>
      </section>
      <section>
        <h3>Reviews</h3>
        {/* form to submit review */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="review">Add Review</label>
          <br />
          <textarea value={newReview} onChange={e => setNewReview(e.target.value)}/>
          <br />
          <button type="submit">Submit</button>
        </form>

        {
          data.reviews.map((review) => (
            <div key={review._id}>
              <p>{review.review}</p>
              <small>{new Date(review.timestamp).toUTCString()}</small>
            </div>
          ))
        }
      </section>
    </div>
  );
}
