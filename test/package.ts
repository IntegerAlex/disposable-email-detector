import disposableEmailDetector from 'disposable-email-detector'

// Test the disposableEmailDetector function
(async () => {
  console.log(await disposableEmailDetector('user69@spamavert.com')); // false
})();