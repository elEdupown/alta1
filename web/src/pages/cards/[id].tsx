import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import createReview from "../../services/createReview";
import getCard from "../../services/getCard";
import getReview from "../../services/getReview";
import Reviews from "../../components/Reviews";

const StyledDiv = styled.div({
  fontFamily: 'sans-serif',
  color: 'black',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
});

const StyledCardInfoSection = styled.section({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
});

const StyledTextArea = styled.textarea({
  width: '650px',
  height: '100px',
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  resize: 'vertical',
});

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
    <StyledDiv>
      <div style={{textAlign: 'left', width: '70%', fontSize: 20, marginTop: 25}}>
        <Link href="/">
        <a>
        Volver al inicio
        </a>
        </Link>
      </div>
      <StyledCardInfoSection>
        <img
          src={`https://royaleapi.github.io/cr-api-assets/cards/${data.cardData.key}.png`}
        />
        <div>
          <h2>
            {data.cardData.name} - {data.cardData.rarity}
          </h2>
          <p>{data.cardData.description}</p>
          <p>
            Elixir: <b> {data.cardData.elixir} </b>
          </p>
        </div>
      </StyledCardInfoSection>
      <section>
        <h3>Reviews</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="review">Add Review</label>
          <br />
          <StyledTextArea value={newReview} onChange={e => setNewReview(e.target.value)} />
          <br />
          <button type="submit">Submit</button>
        </form>
        <Reviews reviews={data.reviews} />
      </section>
    </StyledDiv>
  );
}
