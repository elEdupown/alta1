import deleteReview from "../services/deleteReview";
import Review from "./Review";

type ReviewsProps = {
  reviews: Review[];
  onDelete: (id: string) => void;
};

export default function Reviews({ reviews, onDelete }: ReviewsProps) {
  const handleDelete = (id: string) => () => {
    deleteReview(id);
    onDelete(id);
  };

  return (
    <>
      {reviews.map((review) => (
        <Review key={review._id} handleDelete={handleDelete} review={review} />
      ))}
    </>
  );
}
