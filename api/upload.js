// api/upload.js
const busboy = require('busboy');       // <- factory function in v1+
const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  // Use whichever env var is set
  const token =
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.BLOB2_READ_WRITE_TOKEN;

  if (!token) {
    console.error('No Blob token available.');
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Blob token missing.' }));
    return;
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.startsWith('multipart/form-data')) {
    res.statusCode = 400;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Expected multipart/form-data.' }));
    return;
  }

  // IMPORTANT: busboy v1.x is called as a function, not `new Busboy()`
  const bb = busboy({ headers: req.headers });

  let fileBuffer = null;
  let fileName = null;

  bb.on('file', (fieldname, file, filename) => {
    fileName = filename;
    const chunks = [];
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => {
      fileBuffer = Buffer.concat(chunks);
    });
  });

  bb.on('error', (err) => {
    console.error('Busboy error:', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Error parsing upload.' }));
  });

  bb.on('finish', async () => {
    try {
      if (!fileBuffer || !fileName) {
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ error: 'No file received.' }));
        return;
      }

      const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const timestamp = Date.now();
      const pathname = `drinks/${timestamp}-${safeName}`;

      const blob = await put(pathname, fileBuffer, {
        access: 'public',
        token,          // <- pass token explicitly
      });

      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ url: blob.url, pathname: blob.pathname }));
    } catch (err) {
      console.error('Upload failed:', err);
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: 'Upload failed.' }));
    }
  });

  req.pipe(bb);
};
