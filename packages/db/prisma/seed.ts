import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@gmail.com' },
    update: {},
    create: {
      email: 'alice@gmail.com',
      hashedPassword: await bcrypt.hash('Alice@1234', 10),
      name: 'Alice',
      balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@gmail.com' },
    update: {},
    create: {
      email: 'bob@gmail.com',
      hashedPassword: await bcrypt.hash('Bob@1234', 10),
      name: 'Bob',
      balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })