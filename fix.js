const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  for (const rep of replacements) {
    content = content.replace(rep.search, rep.replace);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

const dir = path.join(__dirname, 'src');

// 1. Zod in candidature
replaceInFile(path.join(dir, 'app/api/candidature/route.ts'), [
  {
    search: /const body = await request.json\(\);/,
    replace: `import { z } from "zod";

const CandidatureSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
  adresse: z.string().min(1),
  codePostal: z.string().min(1),
  ville: z.string().min(1),
  fatigueDecisionnelle: z.string().optional(),
  chargeAllostatique: z.string().optional(),
  salatImpact: z.string().optional(),
  interpositionAccord: z.boolean(),
  motivation: z.string().min(1),
});

    const bodyRaw = await request.json();
    const parsed = CandidatureSchema.safeParse(bodyRaw);
    if (!parsed.success) {
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }
    const body = parsed.data;`
  }
]);

// 2. Zod in contact
replaceInFile(path.join(dir, 'app/api/contact/route.ts'), [
  {
    search: /const body = await request.json\(\);/,
    replace: `import { z } from "zod";

const ContactSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
  adresse: z.string().min(1),
  codePostal: z.string().min(1),
  ville: z.string().min(1),
  typeRelation: z.string(),
  formuleAccompagnement: z.string(),
  livreSelection: z.string(),
  message: z.string().min(1)
});

    const bodyRaw = await request.json();
    const parsed = ContactSchema.safeParse(bodyRaw);
    if (!parsed.success) {
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }
    const body = parsed.data;`
  }
]);

// 3. Zod in offrir
replaceInFile(path.join(dir, 'app/api/offrir/route.ts'), [
  {
    search: /const body = await request.json\(\);/,
    replace: `import { z } from "zod";

const OffrirSchema = z.object({
  offrant: z.object({
    nom: z.string().min(1),
    prenom: z.string().min(1),
    email: z.string().email(),
    telephone: z.string().min(1),
    adresse: z.string().min(1),
    codePostal: z.string().min(1),
    ville: z.string().min(1),
  }),
  beneficiaire: z.object({
    nom: z.string().min(1),
    prenom: z.string().min(1),
    email: z.string().email(),
    telephone: z.string().min(1),
    adresse: z.string().min(1),
    codePostal: z.string().min(1),
    ville: z.string().min(1),
    relation: z.string().min(1),
  }),
  prestation: z.string().min(1),
  message: z.string()
});

    const bodyRaw = await request.json();
    const parsed = OffrirSchema.safeParse(bodyRaw);
    if (!parsed.success) {
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }
    const body = parsed.data;`
  }
]);

// 4. Any in social.ts
replaceInFile(path.join(dir, 'lib/social.ts'), [
  {
    search: /export async function shareOnLinkedIn\(content: any, tokens: any\)/,
    replace: `export async function shareOnLinkedIn(content: { titre: string; content: string }, tokens: { linkedin_access_token: string; linkedin_urn: string })`
  }
]);

// 5. Any in stripe.d.ts
replaceInFile(path.join(__dirname, 'src/stripe.d.ts'), [
  {
    search: /export function loadStripe\(publishableKey: string\): Promise<any>;/,
    replace: `export function loadStripe(publishableKey: string): Promise<unknown>;`
  }
]);

console.log('Fixes applied successfully.');
