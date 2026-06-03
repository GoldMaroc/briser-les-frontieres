const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'lib', 'mail.ts');
let content = fs.readFileSync(file, 'utf8');

// Replacements for functions that have 'email' variable
const functionsWithEmail = [
  'sendClientCandidatureThankYou',
  'sendClientContactThankYou',
  'sendCandidatureApprovedEmail',
  'sendCandidatureRejectedEmail'
];

for (const fnName of functionsWithEmail) {
  const regex = new RegExp(`(function ${fnName}[\\s\\S]*?<p style="margin: 5px 0 0 0; color: rgba\\(160, 174, 192, 0\\.4\\);">© \\$\\{new Date\\(\\)\\.getFullYear\\(\\)\\} Briser les Frontières<\\/p>\\s*)(<\\/div>)`);
  content = content.replace(regex, `$1<p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\\$\{encodeURIComponent(email)\\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>\n      $2`);
}

// Replacement for sendGiftApprovedEmail (beneficiaire)
const regexBen = /(const htmlBeneficiaire = [\s\S]*?<p style="margin: 5px 0 0 0; color: rgba\(160, 174, 192, 0\.4\);">© \$\{new Date\(\)\.getFullYear\(\)\} Briser les Frontières<\/p>\s*)(<\/div>)/;
content = content.replace(regexBen, `$1<p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\\$\{encodeURIComponent(beneficiaireEmail)\\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>\n      $2`);

// Replacement for sendGiftApprovedEmail (offrant)
const regexOffrant = /(const htmlOffrant = [\s\S]*?<p style="margin: 5px 0 0 0; color: rgba\(160, 174, 192, 0\.4\);">© \$\{new Date\(\)\.getFullYear\(\)\} Briser les Frontières<\/p>\s*)(<\/div>)/;
content = content.replace(regexOffrant, `$1<p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\\$\{encodeURIComponent(offrantEmail)\\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>\n      $2`);

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete');
