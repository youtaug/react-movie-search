import React, { useState } from "react";

function MovieCard({ imdbID, Title, Year, Poster }) {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  // カードをクリックしたら詳細を取得/表示を切り替え
  const handleClick = async () => {
    if (!showDetail) {
      // 初回クリックでデータ取得 (あるいは未取得のときだけ)
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=short`
        );
        const data = await res.json();
        setDetailData(data);
      } catch (error) {
        console.error("詳細データの取得に失敗:", error);
      }
    }
    // 表示切り替え
    setShowDetail((prev) => !prev);
  };

  const posterSrc =
    Poster === "N/A"
      ? "https://via.placeholder.com/150?text=No+Image"
      : Poster;

  return (
    <div
      style={{
        width: 180,
        border: "1px solid #ddd",
        padding: 8,
        textAlign: "center",
        cursor: "pointer",
        margin: "0 auto",
      }}
      onClick={handleClick}
    >
      <img
        src={posterSrc}
        alt={Title}
        style={{ width: "100%", height: "auto" }}
      />
      <h4 style={{ margin: "8px 0" }}>{Title}</h4>
      <p>{Year}</p>

      {/* 詳細表示 */}
      {showDetail && detailData && detailData.Response !== "False" && (
        <div style={{ marginTop: 8, fontSize: "0.9rem", textAlign: "left" }}>
          <p>
            <strong>監督:</strong> {detailData.Director}
          </p>
          <p>
            <strong>あらすじ:</strong> {detailData.Plot}
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
