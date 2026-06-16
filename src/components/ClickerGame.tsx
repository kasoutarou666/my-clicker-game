import { useState, useCallback } from "react";
import { getRank, getNextRank, getProgress } from "../lib/gameLogic";

export function ClickerGame() {
  const [score, setScore] = useState(0);
  const [clicking, setClicking] = useState(false);

  const handleClick = useCallback(() => {
    setScore(s => s + 1);
    setClicking(true);
    setTimeout(() => setClicking(false), 100);
  }, []);

  const rank = getRank(score);
  const nextRank = getNextRank(score);
  const progress = getProgress(score);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "white",
      fontFamily: "sans-serif",
      padding: "20px",
    }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "8px", opacity: 0.8 }}>
        🏛️ 議員タップ
      </h1>

      <div style={{
        fontSize: "4rem",
        margin: "16px 0",
        transition: "transform 0.1s",
        transform: clicking ? "scale(1.2)" : "scale(1)",
      }}>
        {rank.emoji}
      </div>

      <h2 style={{ fontSize: "1.3rem", marginBottom: "4px" }}>{rank.name}</h2>
      <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "8px 0" }}>
        {score.toLocaleString()} 票
      </p>

      {nextRank && (
        <div style={{ width: "100%", maxWidth: "300px", margin: "12px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", opacity: 0.7, marginBottom: "4px" }}>
            <span>次のランク: {nextRank.emoji} {nextRank.name}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "999px", height: "8px" }}>
            <div style={{
              background: "linear-gradient(90deg, #e94560, #f5a623)",
              borderRadius: "999px",
              height: "8px",
              width: `${progress}%`,
              transition: "width 0.3s",
            }} />
          </div>
        </div>
      )}

      {!nextRank && (
        <p style={{ color: "#f5a623", fontWeight: "bold", margin: "8px 0" }}>
          👑 最高ランク達成！
        </p>
      )}

      <button
        onClick={handleClick}
        style={{
          marginTop: "24px",
          padding: "20px 48px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          background: clicking
            ? "linear-gradient(135deg, #c0392b, #e74c3c)"
            : "linear-gradient(135deg, #e94560, #f5a623)",
          border: "none",
          borderRadius: "50px",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(233,69,96,0.5)",
          transform: clicking ? "scale(0.95)" : "scale(1)",
          transition: "all 0.1s",
        }}
      >
        タップ！🗳️
      </button>

      <p style={{ marginTop: "32px", fontSize: "0.8rem", opacity: 0.5 }}>
        タップして支持率を上げろ！
      </p>
    </div>
  );
}
