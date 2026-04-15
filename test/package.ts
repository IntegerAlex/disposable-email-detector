import disposableEmailDetector from '../index'
import assert from 'assert'

// Test the disposableEmailDetector function
(async () => {
  assert.strictEqual(await disposableEmailDetector('user69@spamavert.com'), true);
  assert.strictEqual(await disposableEmailDetector('invalid-email'), false);
  console.log('testpackage passed');
})();
