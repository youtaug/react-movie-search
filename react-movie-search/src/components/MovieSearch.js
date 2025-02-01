import React, { useState } from "react";

function MovieSearch({ searchMovies }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(title, year, type);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "8px" }}
      />
      <input
        type="text"
        placeholder="公開年 (例: 1995)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ marginRight: "8px" }}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ marginRight: "8px" }}
      >
        <option value="">すべて</option>
        <option value="movie">映画のみ</option>
        <option value="series">シリーズ</option>
        <option value="game">ゲーム</option>
      </select>

      <button type="submit">検索</button>
    </form>
  );
}

export default MovieSearch;
