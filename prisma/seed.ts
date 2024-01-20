import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

async function seed() {
  const supabase = createClient(
    process.env.NUXT_SUPABASE_URL!,
    process.env.NUXT_SUPABASE_SERVICE_KEY!,
  );

  const { data, error } = await supabase.auth.admin.createUser({
    email: faker.internet.email(),
    password: "password",
    user_metadata: {
      name: faker.person.fullName(),
      roles: ["admin"],
    },
    email_confirm: true,
  });
  if (error) {
    throw error;
  }

  if (!data.user.email) throw new Error("No email returned from Supabase");

  const user = await prisma.userProfile.create({
    data: {
      id: data?.user.id,
      email: data?.user.email,
      name: data?.user.user_metadata.name,
    },
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
