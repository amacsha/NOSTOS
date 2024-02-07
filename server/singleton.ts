// import { PrismaClient } from '@prisma/client'
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// import prisma from './src/models/db'
// import { beforeEach, jest } from '@jest/globals'


// jest.mock('./src/models/db', () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }))

// beforeEach(() => {
//   mockReset(prismaMock)
// })

// export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>