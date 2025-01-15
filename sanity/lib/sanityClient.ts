import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'yourProjectId', // Ganti dengan ID proyek Sanity Anda
    dataset: 'production', // Ganti dengan dataset yang Anda gunakan
    apiVersion: '2023-01-01', // Gunakan versi API Sanity terbaru
    useCdn: false, // Nonaktifkan CDN untuk live updates
    token: 'yourSanityToken', // Ganti dengan token API Sanity (jika dibutuhkan)
});

export default client;
