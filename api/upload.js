const Busboy = require('busboy');
const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  const token =
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.BLOB2_READ_WRITE_TOKEN;

  if (!token) {
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'No Blob token configured.' }));
    return;
  }

  const bb = new Busboy({ headers: req.headers });

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
    res.end(JSON.stringify({ error: 'Upload error parsing form data.' }));
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
        token,
      });

      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ url: blob.url, pathname: blob.pathname }));
    } catch (err) {
      console.error('Upload handler error:', err);
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: 'Upload failed. Check Vercel Blob configuration.' }));
    }
  });

  req.pipe(bb);
};
