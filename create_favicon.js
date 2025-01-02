import fs from 'fs';
import path from 'path';

// Base64 encoded favicon data
const faviconData = `
AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmZmYKZmZmSmZm
ZolmZma6ZmZm2WZmZulmZmbpZmZm2WZmZrpmZmaJZmZmSmZmZgoAAAAAAAAAAAAAAAAAAAAA
ZmZmCGZmZntmZmbvZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZu9mZmZ7ZmZmCAAA
AAAAAAAAZmZmCGZmZntmZmbvZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/
ZmZm72ZmZntmZmYIAAAAAGZmZkpmZmbvZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2Zm
Zv9mZmb/ZmZm/2ZmZv9mZmbvZmZmSmZmZgpmZmaJZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/
ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZolmZmZKZmZmumZmZv9mZmb/ZmZm/2Zm
Zv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZma6ZmZmiWZmZtlmZmb/
ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm2WZm
ZrpmZmbpZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/
ZmZm/2ZmZulmZmbZZmZm6WZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2Zm
Zv9mZmb/ZmZm/2ZmZv9mZmbpZmZmumZmZtlmZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/
ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm2WZmZolmZma6ZmZm/2ZmZv9mZmb/ZmZm/2Zm
Zv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZrpmZmZKZmZmiWZmZv9mZmb/
ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmaJZmZmCmZm
ZkpmZmbvZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmbv
ZmZmSgAAAABmZmYIZmZme2ZmZu9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2Zm
Zv9mZmbvZmZme2ZmZggAAAAAAAAAAGZmZghmZmZ7ZmZm72ZmZv9mZmb/ZmZm/2ZmZv9mZmb/
ZmZm/2ZmZv9mZmbvZmZme2ZmZggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA
//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAA==
`;

const buffer = Buffer.from(faviconData, 'base64');
const faviconPath = path.join(process.cwd(), 'public', 'assets', 'favicon.ico');

// Create the assets directory if it doesn't exist
if (!fs.existsSync(path.join(process.cwd(), 'public', 'assets'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public', 'assets'), { recursive: true });
}

// Write the favicon file
fs.writeFileSync(faviconPath, buffer);
console.log('Favicon created successfully at:', faviconPath); 