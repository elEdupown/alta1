import Link from "next/link";
import styled from '@emotion/styled'

const StyledDiv = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
});

const StyledCard = styled.div({
  textAlign: 'center',
  fontFamily: 'sans-serif',
  color: "black",
  textDecoration: 'none',
  '&:hover': {
    color: 'red',
    textDecoration: 'underline',
  },  
})

export default function CardSection({cards}: {cards: Card[]}) {
  return (
    <StyledDiv>
      {
      cards
        .map(({ id, name, key }) => (
            <Link key={id} href={`/cards/${id}`}>
              <a>
                <StyledCard>
                  <img src={`https://royaleapi.github.io/cr-api-assets/cards/${key}.png`} />
                  <h3>{name}</h3>
                </StyledCard>
              </a>
            </Link>
          )
        )
      }
    </StyledDiv>
  )
}