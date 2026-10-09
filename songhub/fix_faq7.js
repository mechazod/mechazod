const fs = require('fs');
let i18n = fs.readFileSync('i18n.js', 'utf8');

const missingTrans = {
    en: { q: "7. What if you are asked for payment or a donation?", a: "That's a red flag, it looks like you installed a fake binary package. You should be worried if that happens." },
    tl: { q: "7. Kapag hiningan ka ng bayad or donation?", a: "Red flag na yan, mukang fake ang nainstall mo na binary package. Matakot ka na if nangyari yan." },
    ko: { q: "7. 결제나 기부를 요구한다면?", a: "그것은 위험 신호입니다. 가짜 패키지를 설치한 것 같습니다. 그런 일이 발생하면 주의하세요." },
    ja: { q: "7. 支払いや寄付を求められたら？", a: "それは危険信号です。偽のパッケージをインストールした可能性があります。その場合は注意してください。" },
    es: { q: "7. ¿Qué pasa si te piden un pago o donación?", a: "Es una señal de alerta, parece que instalaste un paquete falso. Deberías preocuparte si eso pasa." },
    zh: { q: "7. 如果要求您付款或捐款怎么办？", a: "这是一个危险信号，您可能安装了假的包。如果发生这种情况，您应该小心。" }
};

for (const [lang, trans] of Object.entries(missingTrans)) {
    // Look for lang: { ... faq6_a: "..."
    // Since the key 'lang' might not have quotes:
    const regex = new RegExp(`\\b${lang}\\s*:\\s*{[\\s\\S]*?faq6_a\\s*:\\s*".*?"(?:,|\\n)`);
    i18n = i18n.replace(regex, (match) => {
        // Only append if faq7_q is not already there
        if (!match.includes('faq7_q')) {
            // Remove trailing comma from the match if it exists so we can safely inject
            let cleanMatch = match.replace(/,\\s*$/, '');
            return cleanMatch + `,\n    faq7_q: "${trans.q}",\n    faq7_a: "${trans.a}",\n`;
        }
        return match;
    });
}

fs.writeFileSync('i18n.js', i18n);
console.log('Fixed missing faq7 keys!');
