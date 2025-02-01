import React, { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  // ①映画検索のステート
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ②ダークモードのステート
  const [darkMode, setDarkMode] = useState(false);

  // ③検索履歴のステート
  const [searchHistory, setSearchHistory] = useState([]);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  // ---------------------------
  // 検索処理
  // ---------------------------
  const searchMovies = async (title, year, type) => {
    if (!title) return;

    setIsLoading(true);
    setError("");
    setMovies([]);

    try {
      // "s=" 検索は短い情報しか返ってこないため本来 plot=full は効きませんが、
      // ここでは参考に "&plot=short" を付けてみる (実際には多くの場合無視される)
      let query = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&plot=short`;
      if (year) query += `&y=${year}`;
      if (type) query += `&type=${type}`;

      const response = await fetch(query);
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "検索結果がありません。");
        setMovies([]);
      } else {
        // 検索成功
        setMovies(data.Search);

        // 検索履歴を更新 (最大5件に制限)
        const newHistory = [title, ...searchHistory.filter((t) => t !== title)];
        if (newHistory.length > 5) {
          newHistory.pop(); // 末尾を削除
        }
        setSearchHistory(newHistory);

        // ローカルストレージにも保存
        localStorage.setItem("movieSearchHistory", JSON.stringify(newHistory));
      }
    } catch (err) {
      setError("映画データの取得に失敗しました。");
      console.error("映画データの取得に失敗:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------
  // ダークモード切り替え
  // ---------------------------
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // ---------------------------
  // アプリ起動時に検索履歴を localStorage から読み込む
  // ---------------------------
  useEffect(() => {
    const stored = localStorage.getItem("movieSearchHistory");
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, []);

  // ---------------------------
  // 履歴をクリックすると再検索
  // ---------------------------
  const handleHistoryClick = (title) => {
    searchMovies(title, "", "");
  };

  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <header>
        <h1>映画検索アプリ - 追加機能あり</h1>
        <button onClick={toggleDarkMode} style={{ marginBottom: 16 }}>
          {darkMode ? "ライトモード" : "ダークモード"}
        </button>
      </header>

      {/* 検索フォーム */}
      <MovieSearch searchMovies={searchMovies} />

      {/* エラーメッセージ */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* ローディング中 */}
      {isLoading && <p>検索中です...</p>}

      {/* 最近の検索履歴 */}
      {searchHistory.length > 0 && (
        <div>
          <h3>検索履歴</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {searchHistory.map((item) => (
              <li key={item} style={{ margin: "4px 0" }}>
                <button onClick={() => handleHistoryClick(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 映画リスト */}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
