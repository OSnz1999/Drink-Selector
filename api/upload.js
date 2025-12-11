import { put } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const originalName = file.name || 'upload';
    const safeName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const timestamp = Date.now();
    const pathname = `drinks/${timestamp}-${safeName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return new Response(JSON.stringify({ url: blob.url, pathname: blob.pathname }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('Upload error', err);
    return new Response(JSON.stringify({
      error: 'Upload failed. Check Vercel Blob configuration.',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
