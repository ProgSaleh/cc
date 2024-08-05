const fs = require('node:fs');
const argv = process.argv.slice(2);

const getByteCount = ({ size }) => size;

const getLineCount = ({ fileStr }) =>
  fileStr?.split('').filter((char) => char === '\n')?.length;

const getWordCount = ({ fileStr }) =>
  fileStr
    .replace(/[\r\n\t]+/g, ' ')
    .split(' ')
    .filter((word) => word)?.length;

const getCharachterCount = ({ fileStr }) => fileStr.split('')?.length;

const getDefaultCount = ({ fileStr, size }) => {
  const lineCount = getLineCount({ fileStr });
  const wordCount = getWordCount({ fileStr });
  const byteCount = getByteCount({ size });

  return { lineCount, wordCount, byteCount };
};

let file;
let fileStr;

// default option.
if (argv.length === 1) {
  const [fileName] = argv;
  file = fs.readFileSync(fileName);
  fileStr = file.toString();

  fs.stat(`./${fileName}`, (err, stat) => {
    if (err) {
      console.error(err);
      return;
    }

    const { size } = stat;
    const { lineCount, wordCount, byteCount } = getDefaultCount({
      fileStr,
      fileName,
      size,
    });
    console.log(`${lineCount}\t${wordCount}\t${byteCount} ${fileName}`);
  });
} else {
  const [option, fileName] = argv;
  file = fs.readFileSync(fileName);
  fileStr = file.toString();

  switch (option) {
    case '-c': {
      fs.stat(`./${fileName}`, (err, stat) => {
        if (err) {
          console.error(err);
          return;
        }

        const { size } = stat;
        console.log(`${getByteCount({ size })} ${fileName}`);
      });
      break;
    }
    case '-l': {
      console.log(`${getLineCount({ fileStr })} ${fileName}`);
      break;
    }
    case '-w': {
      console.log(`${getWordCount({ fileStr })} ${fileName}`);
      break;
    }
    case '-m': {
      console.log(`${getCharachterCount({ fileStr })} ${fileName}`);
      break;
    }
  }
}
