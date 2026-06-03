const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\acer\\.gemini\\antigravity\\brain\\63ec75f3-e428-4e9d-a1ec-6436a04e410f\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let pageContent = null;
  let globalsContent = null;
  
  for await (const line of rl) {
    let data;
    try {
       data = JSON.parse(line);
    } catch(e) { continue; }
    
    if (data.type === 'TOOL_RESPONSE' && line.includes('page.tsx')) {
      const output = data.content;
      if (output && !pageContent && output.includes('export default function')) {
        pageContent = output;
      }
    }
    
    if (data.type === 'TOOL_RESPONSE' && line.includes('globals.css')) {
       if (!globalsContent && data.content.includes('@tailwind')) {
         globalsContent = data.content;
       }
    }
  }

  if (pageContent) fs.writeFileSync('extracted_page.txt', pageContent);
  if (globalsContent) fs.writeFileSync('extracted_globals.txt', globalsContent);
}

processLineByLine();
