# Disposable Email Detector

[![CodeScene Code Health](https://codescene.io/projects/50926/status-badges/code-health)](https://codescene.io/projects/50926)
![workflow](https://github.com/IntegerAlex/disposable-email-detector/actions/workflows/main.yml/badge.svg)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/8638/badge)](https://www.bestpractices.dev/projects/8638)
[![DeepSource](https://app.deepsource.com/gh/IntegerAlex/disposable-email-detector.svg/?label=resolved+issues&show_trend=true&token=49_pbJHQLpxvaUFKZ5pbct86)](https://app.deepsource.com/gh/IntegerAlex/disposable-email-detector/)
![NPM Version](https://img.shields.io/npm/v/disposable-email-detector)

## Overview

The `disposable-email-detector` is a TypeScript utility designed to identify disposable email addresses, providing developers with a tool to enhance email verification processes.

## Features

- **Domain Check:** Identifies if an email address belongs to a known disposable email domain.
- **Error Handling:** Offers informative messages for scenarios like missing `index.json` or invalid JSON format.
- **Async File Reading:** Utilizes asynchronous file reading for improved performance.

## Getting Started

### Prerequisites

- Node.js
- npm

### Implementation Details

```javascript
    npm i disposable-email-detector
```

```javascript
    import  disposableEmailDetector  from 'disposable-email-detector';

    const email = 'test@mailinator.com';

    disposableEmailDetector(email)
        .then((response) => console.log(response)); //  true 
```

The disposableEmailDetector function reads a list of disposable email domains from index.json. It checks whether the provided email address belongs to a disposable domain and returns a boolean indicating the result.

### Error Handling

- If `index.json` is not found, the script informs you to create it with disposable domains.
- If `index.json` has an invalid JSON format, it prompts you to correct the file.
- Unexpected errors are logged to the console.
