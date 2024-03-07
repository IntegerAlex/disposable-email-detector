import fs from 'fs/promises';
import Path from 'path';
export default async function disposableEmailDetector(email: string): Promise<boolean> {
  try {
    // Load the list of disposable email domains from the index.json file
    const disposableDomainsBuffer = await fs.readFile(Path.join(__dirname, 'index.json')); 
    const disposableDomains = JSON.parse(disposableDomainsBuffer.toString());

    // Extract the domain from the email address
    const domain = email.split('@')[1].toLowerCase();

    // Check if the domain is in the list of disposable domains
    return disposableDomains.includes(domain);

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('index.json not found. Please create it with disposable domains.');
    } else if (error instanceof SyntaxError) {
      console.error('Invalid JSON format in index.json. Please correct the file.');
    } else {
      console.error('Unexpected error:', error);
    }
    return false; 
  }
}

