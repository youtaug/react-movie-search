import React from "react";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>検索結果はありません。</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{
            width: "180px",
            border: "1px solid #ddd",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <img
            src={
              movie.Poster === "N/A"
                ? "https://via.placeholder.com/150?text=No+Image"
                : movie.Poster
            }
            alt={movie.Title}
            style={{ width: "100%", height: "auto" }}
          />
          <h4 style={{ margin: "8px 0" }}>{movie.Title}</h4>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
