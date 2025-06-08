import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing categories...');
  await prisma.category.deleteMany();

  const categories = [];

  for (let i = 0; i < 100; i++) {
    categories.push({
      name: faker.commerce.department(),
    });
  }

  console.log('📦 Inserting categories...');
  await prisma.category.createMany({
    data: categories,
  });

  console.log('✅ 100 categories added!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
