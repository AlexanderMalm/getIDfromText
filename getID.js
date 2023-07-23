const fs = require('fs');

// Load the specified file with 'utf8' encoding
fs.readFile('sma_gentext.xml', 'utf8', (err, data) => {
  if (err) {
    console.error(`Error:`, err);
  } else {
    const lines = data.split(/\n/);
    const targetId = '42007';

    // Iterate over the lines, check for matching ID
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(`id="${targetId}"`)) {
        if (lines[i + 2]) {
          const targetLine = lines[i + 2];

          // Check for the value of the target element
          const targetMatch = targetLine.match(/<target>(.*?)<\/target>/);
          const targetValue = targetMatch[1];

          // Write the value to a new file
          fs.writeFile('targetValue.txt', targetValue, 'utf8', (writeError) => {
            if (writeError) {
              console.error(`Error writing to file:`, writeError);
            } else {
              console.log(`Value ${targetValue} found and written to targetValue.txt successfully!`);
            }
          });

          break;
        }
      }
    }
  }
});