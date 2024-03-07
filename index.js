"use strict";
var __awaiter = (this?.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this?.__importDefault) || function (mod) {
    return (mod?.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Function to detect disposable email addresses
function disposableEmailDetector(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Load the list of disposable email domains from the index.json file
            const disposableDomainsBuffer = yield promises_1.default.readFile(path_1.default.join(__dirname, 'index.json'));
            const disposableDomains = JSON.parse(disposableDomainsBuffer.toString());
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
            else {
                console.error('Unexpected error:', error);
            }
            return false;
        }
    });
}
exports.default = disposableEmailDetector;
