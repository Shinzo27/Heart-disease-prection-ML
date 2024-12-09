import { prisma } from './prisma';

export const getHealthMetrics = async (id: number) => {
  const healthMetrics = await prisma.healthMetric.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  return healthMetrics;
};