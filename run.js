const fs = require("fs");
const path = require("path");

// CLI args: node run.js 2024 [1]
const [,, yearArg, dayArg] = process.argv;

if (!yearArg) {
  console.error("Usage: node run.js <year> [day]");
  process.exit(1);
}

const year = yearArg.trim();
const daysToRun = dayArg ? [String(dayArg).padStart(2, '0')] :
  fs.readdirSync(`./${year}`)
    .filter(name => name.match(/^day\d+\.js$/))
    .map(name => name.match(/\d+/)[0].padStart(2, '0'));

const pad = (str, size) => `${str}`.padStart(size, " ");
const color = code => `\x1b[38;5;${code}m`;
const reset = `\x1b[0m`;

const timeCode = ms => [10, 118, 11, 208, 124, 9][`${ms}`.length];
const tc = t => `${color(timeCode(t))}${pad(t, 6)} ms${reset}`;
const pc = p => ` ${pad(p, 18)} `;

const time = (fn, input) => {
  const start = process.hrtime();
  const result = fn(input);
  const end = process.hrtime(start);
  const ms = Math.round((end[0] * 1e9 + end[1]) / 1e6);
  return { result, time: ms };
};

let totalTime = 0;
let totalParts = 0;

for (const day of daysToRun) {
  const modulePath = `./${year}/day${day}.js`;
  const inputPath = `./input/${year}-day${day}.txt`;

  if (!fs.existsSync(modulePath)) {
    console.log(`${year}-day${day}: Solution file missing`);
    continue;
  }
  if (!fs.existsSync(inputPath)) {
    console.log(`${year}-day${day}: Input file missing`);
    continue;
  }

  const { part1, part2 } = require(modulePath);
  const input = fs.readFileSync(inputPath, "utf-8");

  try {
    const p1 = time(part1, input);
    const p2 = time(part2, input);

    console.log(`${year}-day${day}: ${pc(p1.result)}${tc(p1.time)}  |  ${pc(p2.result)}${tc(p2.time)}`);

    totalTime += p1.time + p2.time;
    totalParts += 2;
  } catch (err) {
    console.log(`${year}-day${day}: Error: ${err.message}`);
  }
}

if (totalParts > 0) {
  console.log(`\nTotal time: ${totalTime} ms (${(totalTime / totalParts).toFixed(2)} ms per part)`);
}