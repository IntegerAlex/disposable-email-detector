import assert from 'assert';
import http from 'http';
import disposableEmailDetector from '../index';

(async () => {
  // Run first: a non-array external list must be rejected without caching it.
  let requests = 0;
  const server = http.createServer((_req, res) => { requests++; res.end('null'); });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as any).port;
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.strictEqual(await disposableEmailDetector('user@example.com', {
      loadFromSource: { url: `http://127.0.0.1:${port}/` },
    }), false);
  } finally {
    console.error = originalError;
    server.close();
  }
  assert.strictEqual(requests, 1);

  assert.strictEqual(await disposableEmailDetector('user@mailinator.com'), true);
  assert.strictEqual(await disposableEmailDetector('user@MAILINATOR.COM'), true);
  assert.strictEqual(await disposableEmailDetector('user1@gmail.com'), false);
  assert.strictEqual(await disposableEmailDetector('invalid-email'), false);
  assert.strictEqual(await disposableEmailDetector('@'), false);
  assert.strictEqual(await disposableEmailDetector('user@@example.com'), false);
  assert.strictEqual(await disposableEmailDetector(''), false);
  console.log('test package passed');
})();
