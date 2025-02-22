import fs from "fs/promises";
import disposableEmailDetector from "../index";
import path from "path";

// Load test emails from file
const filePath: string = path.join(__dirname, "./testEmails.txt");

async function loadTestEmails(filePath: string): Promise<string[]> {
    const rawData = await fs.readFile(filePath);
    return rawData.toString().trim().split("\n");
}

async function runTests() {
    try {
        const testEmails = await loadTestEmails(filePath);

        for (const email of testEmails) {
            const isDisposable = await disposableEmailDetector(email);
            console.log(email, "- Disposable:", isDisposable);
        }
        console.log("Test passed.");
    } catch (error: any) {
        console.error("Unexpected error:", error);
        console.error("Please check the file path and try again.");
        console.error("Test failed.");
    }
}

async function runTestsExternalGithub() {
    try {
        const testEmails = await loadTestEmails(filePath);

        for (const email of testEmails) {
            const isDisposable = await disposableEmailDetector(email, {
                loadFromSource: { github: true },
            });
            console.log(email, "- Disposable:", isDisposable);
        }
        console.log("External: Github Test passed.");
    } catch (error: any) {
        console.error("Unexpected error:", error);
        console.error("Please check the github repository for index.json and try again.");
        console.error("Test failed.");
    }
}

async function runTestsExternalURL() {
    try {
        const testEmails = await loadTestEmails(filePath);

        for (const email of testEmails) {
            const isDisposable = await disposableEmailDetector(email, {
                loadFromSource: { url: "https://pastebin.com/raw/HL70DeZg" },
            });
            console.log(email, "- Disposable:", isDisposable);
        }
        console.log("External: URL Test passed.");
    } catch (error: any) {
        console.error("Unexpected error:", error);
        console.error("Please check the URL and try again.");
        console.error("Test failed.");
    }
}

runTests();
runTestsExternalGithub();
runTestsExternalURL();
