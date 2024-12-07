-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMetric" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "cp" INTEGER NOT NULL,
    "trestbps" INTEGER NOT NULL,
    "chol" INTEGER NOT NULL,
    "fbs" BOOLEAN NOT NULL,
    "restecg" INTEGER NOT NULL,
    "thalach" INTEGER NOT NULL,
    "exang" BOOLEAN NOT NULL,
    "oldpeak" DOUBLE PRECISION NOT NULL,
    "slope" INTEGER NOT NULL,
    "ca" INTEGER NOT NULL,
    "thal" INTEGER NOT NULL,
    "target" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietRecommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "healthMetricId" INTEGER NOT NULL,
    "dietPlan" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aiFeedback" TEXT,

    CONSTRAINT "DietRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFeedback" (
    "id" SERIAL NOT NULL,
    "recommendationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "HealthMetric" ADD CONSTRAINT "HealthMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietRecommendation" ADD CONSTRAINT "DietRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietRecommendation" ADD CONSTRAINT "DietRecommendation_healthMetricId_fkey" FOREIGN KEY ("healthMetricId") REFERENCES "HealthMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeedback" ADD CONSTRAINT "UserFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeedback" ADD CONSTRAINT "UserFeedback_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "DietRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
