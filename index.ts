import fs from 'fs/promises';
import path from 'path'; 

let cachedDomains: Set<string> | undefined = undefined;

const loadDomains = async () => {
  if(cachedDomains) return cachedDomains;
  const disposableDomainsBuffer = await fs.readFile(path.join(__dirname, 'index.json')); 
  const parsed = JSON.parse(disposableDomainsBuffer.toString());
  if (!Array.isArray(parsed)) throw new TypeError('Disposable domain list must be an array');
  const disposableDomains = new Set<string>(parsed);
  cachedDomains = disposableDomains;
  return disposableDomains;
}

export class ExternalSourceError extends Error {
  constructor(message: string = 'URL must be provided when loading from external source') {
    super(message);
    this.name = 'ExternalSourceError';
    Object.setPrototypeOf(this, ExternalSourceError.prototype);
  }
}

const loadDomainsFromExternalSource = async ({github, url}: LoadFromSource) => {
    if (cachedDomains) return cachedDomains;
    const URL = github ? "https://raw.githubusercontent.com/IntegerAlex/disposable-email-detector/refs/heads/main/index.json" : url;
    if (!URL) throw new ExternalSourceError();
    try {
        const response = await fetch(URL);
        const parsed = await response.json();
        if (!Array.isArray(parsed)) throw new TypeError('Disposable domain list must be an array');
        const disposableDomains = new Set<string>(parsed);
        cachedDomains = disposableDomains;
        return disposableDomains;
    } catch (error) {
        throw new ExternalSourceError("Failed to load disposable domains from the provided URL");
    }
}

type LoadFromSource = {
    github?: boolean;
    url?: string;
}

type Options = {
    loadFromSource?: LoadFromSource;
}

// Function to detect disposable email addresses
export default async function disposableEmailDetector(email: string, options?: Options): Promise<boolean> {
  try {
      let disposableDomains: Set<string>;
    // Load from external source
    if (options?.loadFromSource) {
        disposableDomains = await loadDomainsFromExternalSource(options.loadFromSource);
    } else {
        disposableDomains = await loadDomains();
    }
    
    
    // Extract the domain from the email address
    const domain = email.split('@')[1].toLowerCase(); // Get the domain part of the email address and convert it to lowercase

    // Check if the domain is in the list of disposable domains 
    return disposableDomains.has(domain);

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('index.json not found. Please create it with disposable domains.');
    } else if (error instanceof SyntaxError) {
      console.error('Invalid JSON format in index.json. Please correct the file.');
    } else if (error instanceof ExternalSourceError) {
        console.error(error.message);
    }
    else {
      console.error('Unexpected error:', error);
    }
    return false; 
  }
}

