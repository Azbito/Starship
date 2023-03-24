export default function numberConvert(number: number) {
  if (number < 1000) {
    return number;
  }

  const acronyms = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" }
  ];

  let i;

  for (i = acronyms.length - 1; i > 0; i--) {
    if (number >= acronyms[i].v) {
      break;
    }
  }

  return (
    (number / acronyms[i].v)
      .toFixed(2)
      .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + acronyms[i].s
  );
}