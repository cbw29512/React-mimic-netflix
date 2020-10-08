import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./banner.css";

export default function Banner() {
  const [movie, setmovie] = useState([]);

  // it run on a given condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      // getting a random movie for header
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: ` url("https://image.tmdb.org/t/p/original/${movie?.poster_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div>
          <button className="banner__btn">Play</button>
          <button className="banner__btn">Add To List</button>
        </div>

        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner__fadebottom" />
    </header>
  );
}
