const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move HTML out of sponsor-item
const carouselHtml = `
            <div class="app-screenshots">
                <img src="https://parkspacer.com/cardsense/ss1.png" class="screenshot-img" alt="CardSense 1" loading="lazy">
                <img src="https://parkspacer.com/cardsense/ss2.png" class="screenshot-img" alt="CardSense 2" loading="lazy">
                <img src="https://parkspacer.com/cardsense/ss3.png" class="screenshot-img" alt="CardSense 3" loading="lazy">
                <img src="https://parkspacer.com/cardsense/ss4.png" class="screenshot-img" alt="CardSense 4" loading="lazy">
                <img src="https://parkspacer.com/cardsense/ss5.png" class="screenshot-img" alt="CardSense 5" loading="lazy">
            </div>`;

// Remove from inside sponsor-item
html = html.replace(carouselHtml, '');

// Insert it right after the closing of sponsor-items
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<h2 class="cta-title"/, match => {
    return '        </div>\n            </div>\n' + carouselHtml + '\n        </div>\n\n        <h2 class="cta-title"';
});


// 2. Reduce image size in CSS
html = html.replace(/height: 320px;/g, 'height: 180px;');

// 3. Make the carousel more compact
html = html.replace(/padding: 1rem 0.5rem;/g, 'padding: 0.5rem 0;');
html = html.replace(/margin-top: 1rem;/g, 'margin-top: 0.5rem;');
html = html.replace(/gap: 1rem;/g, 'gap: 0.5rem;');

fs.writeFileSync('index.html', html);
console.log('Made it compact!');
