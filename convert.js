const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// フォルダ別のリサイズ設定
const resizeMap = {
  'mainvisual': 1920,  // ヒーロー画像はフルサイズ
  'default': 800       // その他は800px
};

// imgフォルダ内のJPGを再帰的に取得
function getJpgFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getJpgFiles(fullPath));
    } else if (/\.(jpg|jpeg)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convertAll() {
  const imgDir = path.join(__dirname, 'img');
  const files = getJpgFiles(imgDir);

  console.log(`変換対象：${files.length}枚\n`);

  let success = 0;
  for (const file of files) {
    const basename = path.basename(file, path.extname(file));
    const outPath = path.join(path.dirname(file), basename + '.webp');

    // mainvisualはフルサイズ、それ以外は800px
    const width = basename.includes('mainvisual') ? resizeMap.mainvisual : resizeMap.default;

    try {
      const info = await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);

      const originalSize = (fs.statSync(file).size / 1024).toFixed(0);
      const newSize = (info.size / 1024).toFixed(0);
      console.log(`✓ ${path.relative(__dirname, file)}`);
      console.log(`  ${originalSize}KB → ${newSize}KB (${width}px幅)\n`);
      success++;
    } catch (err) {
      console.error(`✗ エラー：${file}`, err.message);
    }
  }

  console.log(`完了：${success}/${files.length}枚`);
}

convertAll();
