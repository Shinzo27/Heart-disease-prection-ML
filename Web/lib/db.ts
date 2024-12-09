import model from "./gemini";
import { prisma } from "./prisma";

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

export const getPrediction = async (data: any) => {
  const prompt = `You are an API for a health application. Always respond in JSON format with the following structure:
                  {
                    "status": "success",
                    "data": {
                      "dietRecommendation": {
                        "foods": ["string"],
                        "exercises": ["string"],
                        "supplements": ["string"]
                      },
                      "analysis": {
                        "problemAreas": ["string"],
                        "suggestions": ["string"]
                      } 
                    },
                    "error": "null or string"
                  }
      
                  Input data: {heartRate: {
                    age: ${data.age}\n
                    sex: ${data.sex}\n
                    cp: ${data.cp}\n
                    trestbps: ${data.trestbps}\n
                    chol: ${data.chol}\n
                    fbs: ${data.fbs}\n
                    restecg: ${data.restecg}\n
                    thalach: ${data.thalach}\n
                    exang: ${data.exang}\n
                    oldpeak: ${data.oldpeak}\n
                    slope: ${data.slope}\n
                    ca: ${data.ca}\n  
                  }}
      
                  Provide a response in this format.`;
  const result = await model.generateContent([prompt]);
  const response = result.response.text();
  return response;
};
