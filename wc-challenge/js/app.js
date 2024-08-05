const fs = require('node:fs');
const argv = process.argv.slice(2);

const getByteCount = ({ size }) => size;

const getLineCount = ({ fileStr }) =>
  fileStr?.split('').filter((char) => char === '\n')?.length;

const getWordCount = ({ fileStr }) =>
  fileStr
    .replace(/[\r\n\t]+/g, ' ')
    .split(' ')
    ?.filter((word) => word)?.length;

const getCharachterCount = ({ fileStr }) => fileStr.length;

const getDefaultCount = ({ fileStr, size }) => {
  const lineCount = getLineCount({ fileStr });
  const wordCount = getWordCount({ fileStr });
  const byteCount = getByteCount({ size });

  return { lineCount, wordCount, byteCount };
};

const printInfo = ({ option, fileName, fileStr, size }) => {
  switch (option) {
    case '-c': {
      console.log(`${getByteCount({ size })} ${fileName}`);
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
    default: {
      const { lineCount, wordCount, byteCount } = getDefaultCount({
        fileStr,
        size,
      });
      console.log(`${lineCount}\t${wordCount}\t${byteCount} ${fileName}`);
      break;
    }
  }
};

const main = () => {
  if (argv.length < 1 || argv.length > 2) {
    console.error('Invalid entry');
    process.exit(1);
  }

  const [existingOption, existingFileName] = argv;
  const option = existingFileName ? existingOption : null;
  const fileName = existingFileName || existingOption;

  try {
    const file = fs.readFileSync(fileName);
    const fileStr = file.toString();
    const size = fs.statSync(fileName).size;

    printInfo({ option, fileName, fileStr, size });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.log({ 'err>>>': err });
  }
};

main();
