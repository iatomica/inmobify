const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/hero_residencia_andina_1788803814843.jpg', out: 'hero_residencia_andina.webp' },
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/cabana_alpina_bosque_1788805403236.jpg', out: 'cabana_alpina_bosque.webp' },
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/casa_moderna_lago_1788805686448.jpg', out: 'casa_moderna_lago.webp' },
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/lote_montana_panoramico_1788805791390.jpg', out: 'lote_montana_panoramico.webp' },
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/local_comercial_andino_1788805888209.jpg', out: 'local_comercial_andino.webp' },
  { src: 'C:/Users/tmp/.gemini/antigravity-ide/brain/a0f372e8-4f32-4e2e-9a6f-3f66e46e7a99/departamento_penthouse_andino_1788806068962.jpg', out: 'departamento_penthouse_andino.webp' }
];

async function run() {
  for (const item of images) {
    if (fs.existsSync(item.src)) {
      const dest = path.join(targetDir, item.out);
      await sharp(item.src)
        .webp({ quality: 82, effort: 6 })
        .toFile(dest);
      const sizeKB = (fs.statSync(dest).size / 1024).toFixed(0);
      console.log(`Created: ${item.out} (${sizeKB} KB)`);
    } else {
      console.warn(`Source missing: ${item.src}`);
    }
  }
}

run();
