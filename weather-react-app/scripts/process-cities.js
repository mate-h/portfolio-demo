const fs = require("fs");
const zlib = require("zlib");
const cliProgress = require("cli-progress");

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

fs.readFile("./src/assets/city.list.min.json.gz", (err, buffer) => {
  if (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
  zlib.unzip(buffer, (err, buffer) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
    const data = JSON.parse(buffer.toString());
    console.log(`processing ${data.length} cities`);
    bar1.start(data.length, 1);

    const size = data.reduce(
      (acc, curr, i) => acc + 1 + curr.name.length * 2,
      0
    );
    let byteArray = new Uint8Array(size);
    const encoder = new TextEncoder();
    byteArray = data.reduce((acc, curr, i) => {
      bar1.update(i + 1);
      acc[i] = curr.id;
      acc[i + 1] = curr.name.length * 2;
      [...encoder.encode(curr.name)].forEach((b, j) => {
        acc[i + 1 + j] = b;
      });
      return acc;
    }, byteArray);
    bar1.stop();
    fs.writeFileSync("./public/cities.bin", Buffer.from(byteArray));
    // console.log(result);
  });
});

// fs.writeFileSync(
//   "/Users/mateh/Downloads/city.list.json",
//   JSON.stringify(cities.map((c) => [c.id, c.name, c.country]))
// );
