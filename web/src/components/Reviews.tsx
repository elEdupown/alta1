import styled from "@emotion/styled";

const StyledReview = styled.div({
  background: '#efefef',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 10px',
  margin: '5px 0',
  '& > small': {
    alignSelf: 'flex-end',
  }
})

export default function Reviews({reviews}:{reviews: Review[]}) {
  return (
    <>
    {
      reviews.map((review) => (
        <StyledReview key={review._id}>
          <p>{review.review}</p>
          <small>{new Date(review.timestamp).toUTCString()}</small>
        </StyledReview>
      ))
    }
    </>
  );
}