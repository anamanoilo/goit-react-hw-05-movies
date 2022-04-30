// import s from './Cast.module.scss';
import notFoundImg from 'images/not_found_ver.jpg';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import api from 'services/ApiService';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  const loadCast = useCallback(async () => {
    api.movieId = movieId;
    try {
      const data = await api.fetchMovieCast();
      setCast(data.cast);
    } catch (error) {
      console.error(error);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      loadCast();
    }
  }, [loadCast, movieId]);

  return (
    cast && (
      <ul>
        {cast.length ? (
          cast.map(({ id, name, profile_path, original_name, character }) => {
            return (
              <li key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : notFoundImg
                  }
                  alt={name}
                  width="200px"
                />
                <p>{name || original_name}</p>
                <p>
                  <span>Character: </span>
                  {character || 'not found...'}
                </p>
              </li>
            );
          })
        ) : (
          <li>
            <p>We don't have any cast for this movie</p>
          </li>
        )}
      </ul>
    )
  );
};

export default Cast;
