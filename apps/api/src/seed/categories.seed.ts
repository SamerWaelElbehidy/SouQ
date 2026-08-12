/**
 * SouQ — Category seed script
 * Run with: npx ts-node -r tsconfig-paths/register src/seed/categories.seed.ts
 *
 * Or add to package.json scripts:
 *   "seed:categories": "ts-node -r tsconfig-paths/register src/seed/categories.seed.ts"
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'برمجيات',        slug: 'software'  },
  { name: 'تصميم',          slug: 'design'    },
  { name: 'قوالب جاهزة',   slug: 'templates' },
  { name: 'ألعاب وترفيه',  slug: 'games'     },
  { name: 'كورسات',         slug: 'courses'   },
  { name: 'تسويق رقمي',    slug: 'marketing' },
  { name: 'موسيقى وصوتيات',slug: 'music'     },
  { name: 'أمن وحماية',    slug: 'security'  },
];

async function main() {
  console.log('🌱 Seeding categories...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: { name: cat.name },
    });
    console.log(`  ✓ ${cat.name} (${cat.slug})`);
  }
  console.log('✅ Categories seeded successfully.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
