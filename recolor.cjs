const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const input = 'src/assets/brand_assets/LOGO - Windal.png';
  
  // Hue rotate by 180 degrees to turn orange to blue, keep grey as grey
  // Modulate takes an object with hue in degrees
  await sharp(input)
    .modulate({
      hue: 180
    })
    .toFile('src/assets/brand_assets/LOGO_Blue.png');
    
  // Also create a flattened JPEG for the PDF
  await sharp(input)
    .modulate({
      hue: 180
    })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 100 })
    .toFile('src/assets/brand_assets/LOGO_Blue.jpg');
    
  console.log('Logo recolored successfully!');
}

processLogo().catch(console.error);
