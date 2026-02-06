import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const textures = {
    "sun": "https://www.solarsystemscope.com/textures/download/2k_sun.jpg",
    "mercury": "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg",
    "venus": "https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg",
    "venus_atmosphere": "https://www.solarsystemscope.com/textures/download/2k_venus_atmosphere.jpg",
    "earth": "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
    "earth_clouds": "https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg",
    "moon": "https://www.solarsystemscope.com/textures/download/2k_moon.jpg",
    "mars": "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
    "jupiter": "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
    "saturn": "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg",
    "saturn_ring": "https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png",
    "uranus": "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg",
    "neptune": "https://www.solarsystemscope.com/textures/download/2k_neptune.jpg",
    "stars": "https://www.solarsystemscope.com/textures/download/2k_stars_milky_way.jpg"
};

const outputDir = path.join(__dirname, '../public/assets/textures');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Starting texture download...');

const downloadFile = (name, url) => {
    return new Promise((resolve, reject) => {
        const ext = url.split('.').pop();
        const filename = `${name}.${ext}`;
        const filepath = path.join(outputDir, filename);

        if (fs.existsSync(filepath)) {
            console.log(`✅ Skipping ${filename} (already exists)`);
            resolve();
            return;
        }

        console.log(`⬇️  Downloading ${filename}...`);

        const request = https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: Status ${response.statusCode}`));
                return;
            }

            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✅ Success: ${filename}`);
                resolve();
            });
        });

        request.on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete partial file
            reject(err);
        });
    });
};

async function downloadAll() {
    for (const [name, url] of Object.entries(textures)) {
        try {
            await downloadFile(name, url);
        } catch (error) {
            console.error(`❌ Error downloading ${name}:`, error.message);
        }
    }
    console.log('✨ All downloads completed!');
}

downloadAll();
