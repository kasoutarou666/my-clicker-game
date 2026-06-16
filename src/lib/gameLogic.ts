export const RANKS = [
  { name: "一般市民",     threshold: 0,      emoji: "🧑", message: "まずは一票から。あなたの一票が政治を変える…かもしれない" },
  { name: "地方議員",     threshold: 100,    emoji: "👔", message: "市民のために働くか、市民からお金を吸い上げるか。それはあなた次第です" },
  { name: "国会議員",     threshold: 1000,   emoji: "🎩", message: "財務省のレクをお待ちください" },
  { name: "大　臣",      threshold: 10000,  emoji: "🏅", message: "天下り先はもう決まっています" },
  { name: "内閣総理大臣", threshold: 100000, emoji: "👑", message: "国民を苦しめて食う飯と国民を幸せにして食う飯はどっちが美味い？" },
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
