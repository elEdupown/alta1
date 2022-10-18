import styled from "@emotion/styled";
import { useState } from "react";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import Save from "../icons/Save";
import updateReview from "../services/updateReview";

const StyledReview = styled.div({
  background: "#efefef",
  display: "flex",
  flexDirection: "column",
  padding: "0 10px",
  margin: "5px 0",
  "& > small": {
    alignSelf: "flex-end",
  },
});

const StyledP = styled.p({
  display: "flex",
  justifyContent: "space-between",
  "&  button": {
    border: "none",
    "&:hover": {
      cursor: "pointer",
      fill: "red",
    },
  },
});

type ReviewProps = {
  handleDelete: (id: string) => () => void;
  review: Review;
};

export default function Review({ handleDelete, review }: ReviewProps) {
  const [editMode, setEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(review.review);
  const handleEdit = () => {
    if (editMode) {
      updateReview(review._id, reviewText);
    }
    setEditMode(!editMode);
  };

  return (
    <StyledReview key={review._id}>
      <StyledP>
        {editMode ? (
          <textarea
            style={{ width: 535 }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        ) : (
          reviewText
        )}
        <span>
          <button onClick={handleEdit}>{editMode ? <Save /> : <Edit />}</button>
          <button onClick={handleDelete(review._id)}>
            <Delete />
          </button>
        </span>
      </StyledP>
      <small>{new Date(review.timestamp).toUTCString()}</small>
    </StyledReview>
  );
}
