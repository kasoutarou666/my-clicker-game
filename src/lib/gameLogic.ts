export const RANKS = [
  { name: "一般市民",     threshold: 0,      emoji: "👤" },
  { name: "地方議員",     threshold: 100,    emoji: "🏛️" },
  { name: "国会議員",     threshold: 1000,   emoji: "⭐" },
  { name: "大　臣",      threshold: 10000,  emoji: "🎖️" },
  { name: "内閣総理大臣", threshold: 100000, emoji: "👑" },
];

export function getRank(score: number) {
  return [...RANKS].reverse().find(r => score >= r.threshold)!;
}

export function getNextRank(score: number) {
  return RANKS.find(r => r.threshold > score) ?? null;
}

export function getProgress(score: number): number {
  const current = [...RANKS].reverse().find(r => score >= r.threshold)!;
  const next = RANKS.find(r => r.threshold > score);
  if (!next) return 100;
  const range = next.threshold - current.threshold;
  const progress = score - current.threshold;
  return Math.floor((progress / range) * 100);
}
