import React, { useEffect, useState } from "react";
import "../../styles/test.css";

const OneMovie = (props) => {
  const [movie, setMovie] = useState();
  const [movieIsValid, setMovieIsValid] = useState(false);
  const movieHandler = () => {
    return new Promise((resolve, reject) => {
      resolve(props.movie);
    });
  };

  const movieValue = movieHandler();

  movieValue.then((value) => {
    setMovie(value);
    console.log(movie);
  });

  useEffect(() => {
    movieHandler();
  }, []);

  const p1 = () => {
    console.log(movie, "-------");
  };

  //   setInterval(() => { 106 41.5 31 32.5 22 106 41 34
  //     if (props === null) {
  //       return;
  //     }
  //     p1 = props.movie;
  //     const p2 = p1.splice(0, 1);
  //     p1.push(p2[0]);
  //     console.log(p1[0], "-----------------");
  //   }, 2000);

  return <div> {movieIsValid ? "hello" : "loading..."}</div>;
};

export default OneMovie;
