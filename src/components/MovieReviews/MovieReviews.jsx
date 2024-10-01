import { fetchMovieReviews } from "../../Api/Api";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const MovieReviews = ({ initialReviews }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(initialReviews || []);
  useEffect(() => {
    const getReviews = async () => {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    };

    if (!initialReviews) {
      getReviews();
    }
  }, [movieId, initialReviews]);
  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
