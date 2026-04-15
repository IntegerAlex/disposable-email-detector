import disposableEmailDetector from '../index'
import assert from 'assert'

// Test the disposableEmailDetector function
(async () => {
  assert.strictEqual(await disposableEmailDetector('user1@gmail.com'), false);
  assert.strictEqual(await disposableEmailDetector('invalid-email'), false);
  console.log('test package passed');
})();
