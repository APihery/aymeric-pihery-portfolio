/**
 * Script d'optimisation des images du portfolio (WebP uniquement)
 * - Génère des .webp à partir des JPG/PNG présents dans ressources/
 * - Option --compress : compresse aussi les originaux JPG/PNG
 *
 * Usage: npm run optimize-images
 *        npm run optimize-images:compress
 *
 * Le site n'affiche que des .webp ; ce script sert quand vous ajoutez de nouvelles images JPG/PNG.
 */

const fs = require('fs');
const path = require('path');

const RESSOURCES_DIR = path.join(__dirname, '..', 'ressources');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const COMPRESS_ORIGINALS = process.argv.includes('--compress');

async function getSharp() {
    try {
        return require('sharp');
    } catch {
        console.error('Installez sharp : npm install sharp');
        process.exit(1);
    }
}

function* walkDir(dir, base = '') {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const rel = path.join(base, e.name);
        if (e.isDirectory()) {
            yield* walkDir(path.join(dir, e.name), rel);
        } else if (EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
            yield { fullPath: path.join(dir, e.name), rel };
        }
    }
}

async function optimizeImage(sharp, fullPath, compressOriginals) {
    const ext = path.extname(fullPath).toLowerCase();
    const dir = path.dirname(fullPath);
    const base = path.basename(fullPath, ext);
    let sourcePath = fullPath;

    if (compressOriginals && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
        const tmpPath = fullPath + '.tmp';
        if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(fullPath).jpeg({ quality: 82, mozjpeg: true }).toFile(tmpPath);
        } else {
            await sharp(fullPath).png({ quality: 80, compressionLevel: 9 }).toFile(tmpPath);
        }
        if (fs.existsSync(tmpPath)) {
            fs.renameSync(tmpPath, fullPath);
        }
        sourcePath = fullPath;
    }

    const webpPath = path.join(dir, base + '.webp');
    await sharp(sourcePath).webp({ quality: 85 }).toFile(webpPath);
    return webpPath;
}

async function main() {
    const sharp = await getSharp();
    let processed = 0;
    let errors = 0;

    for (const { fullPath, rel } of walkDir(RESSOURCES_DIR)) {
        try {
            await optimizeImage(sharp, fullPath, COMPRESS_ORIGINALS);
            console.log('OK', rel);
            processed++;
        } catch (err) {
            console.error('Erreur', rel, err.message);
            errors++;
        }
    }

    console.log(`\nTerminé: ${processed} image(s) traitée(s), ${errors} erreur(s).`);
    console.log('Fichiers .webp créés à côté de chaque image.');
    if (COMPRESS_ORIGINALS) {
        console.log('Originaux JPG/PNG compressés (--compress).');
    }
}

main();
