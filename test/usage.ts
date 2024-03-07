import fs from 'fs/promises';
import { disposableEmailDetector } from './index.js'; // Adjust path as needed
import path from 'path';    
// Load test emails from file
const filePath = path.join(__dirname ,'./testEmails.txt');
async function loadTestEmails(filePath) {
  const rawData = await fs.readFile(filePath);
  return rawData.toString().trim().split('\n');
}

async function runTests() {
  const testEmails = await loadTestEmails('./testEmails.txt');

  for (const email of testEmails) {
    const isDisposable = await disposableEmailDetector(email);
    console.log(email, '- Disposable:', isDisposable);
  }
}

runTests();
