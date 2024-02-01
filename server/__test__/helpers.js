const {prisma} = require('../src/models/db')

async function clearDatabase () {
  // The order is important! Do not change!
  await prisma.comment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.lastVisited.deleteMany({});
  await prisma.entry.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.place.deleteMany({});
}

async function disconnectDatabase() {
  prisma.$disconnect();
}

module.exports = {clearDatabase, disconnectDatabase}