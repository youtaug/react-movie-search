import React, { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ダークモードON/OFF
  const [darkMode, setDarkMode] = useState(false);

  // .env に設定した OMDb APIキー
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  // 映画検索処理
  const searchMovies = async (title, year, type) => {
    if (!title) return;

    setIsLoading(true);
    setError("");
    setMovies([]);

    try {
      let query = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
      if (year) {
        query += `&y=${year}`;
      }
      if (type) {
        query += `&type=${type}`;
      }

      const response = await fetch(query);
      const data = await response.json();

      if (data.Response === "False") {
        // 見つからない/エラーの場合
        setError(data.Error || "検索結果がありません。");
        setMovies([]);
      } else {
        // 検索成功
        setMovies(data.Search);
      }
    } catch (err) {
      setError("映画データの取得に失敗しました。");
      console.error("映画データの取得に失敗:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ダークモード切り替え
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    // darkMode が true のときだけ "dark-mode" クラスを付与
    <div className={darkMode ? "App dark-mode" : "App"}>
      <header>
        <h1>映画検索アプリ</h1>
        <button onClick={toggleDarkMode} style={{ marginBottom: 16 }}>
          {darkMode ? "ライトモード" : "ダークモード"}
        </button>
      </header>

      <MovieSearch searchMovies={searchMovies} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p>検索中です...</p>}

      <MovieList movies={movies} />
    </div>
  );
}

export default App;
