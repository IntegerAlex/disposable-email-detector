"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSourceError = void 0;
exports.default = disposableEmailDetector;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
let cachedDomains = undefined;
const loadDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedDomains)
        return cachedDomains;
    const disposableDomainsBuffer = yield promises_1.default.readFile(path_1.default.join(__dirname, 'index.json'));
    const disposableDomains = JSON.parse(disposableDomainsBuffer.toString());
    cachedDomains = disposableDomains;
    return disposableDomains;
});
class ExternalSourceError extends Error {
    constructor(message = 'URL must be provided when loading from external source') {
        super(message);
        this.name = 'ExternalSourceError';
        Object.setPrototypeOf(this, ExternalSourceError.prototype);
    }
}
exports.ExternalSourceError = ExternalSourceError;
const loadDomainsFromExternalSource = (_a) => __awaiter(void 0, [_a], void 0, function* ({ github, url }) {
    if (cachedDomains)
        return cachedDomains;
    const URL = github ? "https://raw.githubusercontent.com/IntegerAlex/disposable-email-detector/refs/heads/main/index.json" : url;
    if (!URL)
        throw new ExternalSourceError();
    console.info(`Loading disposable domains from ${URL}`);
    try {
        const response = yield fetch(URL);
        const disposableDomains = yield response.json();
        cachedDomains = disposableDomains;
        return disposableDomains;
    }
    catch (error) {
        throw new ExternalSourceError("Failed to load disposable domains from the provided URL");
    }
});
// Function to detect disposable email addresses
function disposableEmailDetector(email, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let disposableDomains = [];
            // Load from external source
            if (options === null || options === void 0 ? void 0 : options.loadFromSource) {
                disposableDomains = yield loadDomainsFromExternalSource(options.loadFromSource);
            }
            else {
                disposableDomains = yield loadDomains();
            }
            // Extract the domain from the email address
            const domain = email.split('@')[1].toLowerCase(); // Get the domain part of the email address and convert it to lowercase
            // Check if the domain is in the list of disposable domains 
            return disposableDomains.includes(domain);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                console.error('index.json not found. Please create it with disposable domains.');
            }
            else if (error instanceof SyntaxError) {
                console.error('Invalid JSON format in index.json. Please correct the file.');
            }
            else if (error instanceof ExternalSourceError) {
                console.error(error.message);
            }
            else {
                console.error('Unexpected error:', error);
            }
            return false;
        }
    });
}
