// Заповни своїми фразами
const FORTUNES = [
  "Сьогодні твоя інтуїція — це GPS. Довіряй.",
  "Залишайся послідовним — результат здивує.",
  "Несподівана зустріч принесе ідею.",
  "Не поспішай — темп визначає якість.",
  "Сміливість зараз вигідніша за обережність."
];

// Повертає випадковий елемент, але не той самий двічі підряд
export function pickRandomFortune() {
  const prev = sessionStorage.getItem("prev_fortune_idx");
  let idx = Math.floor(Math.random() * FORTUNES.length);
  if (FORTUNES.length > 1 && prev !== null && Number(prev) === idx) {
    idx = (idx + 1) % FORTUNES.length;
  }
  sessionStorage.setItem("prev_fortune_idx", String(idx));
  return { idx, text: FORTUNES[idx] };
}

// (опціонально) детерміноване “одне на день”:
// однаково для одного користувача протягом дня
export function pickDailyFortune() {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  let seed = 0;
  for (const ch of key) seed = (seed * 31 + ch.charCodeAt(0)) % 2147483647;
  const idx = seed % FORTUNES.length;
  return { idx, text: FORTUNES[idx] };
}
