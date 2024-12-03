"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Brain,
  Heart,
  Menu,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ result: number }> }) {
  const assessmentResult = {
    riskScore: 65,
    riskLevel: "Moderate",
    keyFactors: [
      { name: "Blood Pressure", value: 140, unit: "mm Hg", status: "High" },
      {
        name: "Cholesterol",
        value: 220,
        unit: "mg/dL",
        status: "Borderline High",
      },
      { name: "Blood Sugar", value: 110, unit: "mg/dL", status: "Normal" },
      { name: "BMI", value: 27.5, unit: "kg/m²", status: "Overweight" },
    ],
    lifestyle: {
      exercise: "Low",
      diet: "Needs Improvement",
      stress: "Moderate",
    },
    recommendations: [
      "Increase physical activity to at least 150 minutes of moderate-intensity exercise per week",
      "Adopt a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins",
      "Monitor blood pressure regularly and consider medication if it remains consistently high",
      "Schedule a follow-up with a cardiologist for a more comprehensive evaluation",
    ],
  };

  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Your Heart Health Assessment Explained
          </h1>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Risk Assessment
              </CardTitle>
              <CardDescription>
                Based on your provided information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className="text-sm font-medium">
                      {assessmentResult.riskScore}%
                    </span>
                  </div>
                  <Progress
                    value={assessmentResult.riskScore}
                    className="h-2"
                  />
                </div>
                <p className="text-lg font-semibold">
                  Your heart health risk level is considered:
                  <span className="text-yellow-600">
                    {" "}
                    {assessmentResult.riskLevel}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  This means you have an elevated risk of developing heart
                  disease. However, with proper lifestyle changes and medical
                  guidance, you can significantly improve your heart health.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-500" />
                Key Health Factors
              </CardTitle>
              <CardDescription>
                Detailed breakdown of your health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {assessmentResult.keyFactors.map((factor, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{factor.name}</h3>
                    <p className="text-2xl font-bold">
                      {factor.value}{" "}
                      <span className="text-sm font-normal">{factor.unit}</span>
                    </p>
                    <p
                      className={`text-sm ${
                        factor.status === "Normal"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {factor.status}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-green-500" />
                Lifestyle Analysis
              </CardTitle>
              <CardDescription>
                Overview of your current lifestyle habits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">
                    Exercise Level:{" "}
                    <span className="font-normal text-red-600">
                      {assessmentResult.lifestyle.exercise}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Regular physical activity is crucial for maintaining a
                    healthy heart. Aim to increase your exercise routine
                    gradually.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    Diet Quality:{" "}
                    <span className="font-normal text-yellow-600">
                      {assessmentResult.lifestyle.diet}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Your diet plays a significant role in heart health. Consider
                    incorporating more heart-healthy foods into your meals.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    Stress Level:{" "}
                    <span className="font-normal text-yellow-600">
                      {assessmentResult.lifestyle.stress}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Chronic stress can negatively impact your heart. Explore
                    stress-reduction techniques like meditation or yoga.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions for improving your heart health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {assessmentResult.recommendations.map(
                  (recommendation, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {recommendation}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="trends">Health Trends</TabsTrigger>
              <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Overview</CardTitle>
                  <CardDescription>
                    A summary of your heart health status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Your assessment indicates a moderate risk for heart disease.
                    Key areas of concern include elevated blood pressure and
                    cholesterol levels. However, with targeted lifestyle changes
                    and proper medical guidance, you can significantly improve
                    your heart health outlook.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="detailed">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                  <CardDescription>
                    In-depth explanation of your health metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Your blood pressure of 140 mm Hg is classified as
                    hypertension stage 2, which significantly increases your
                    risk of heart disease and stroke. Your cholesterol level of
                    220 mg/dL is borderline high, potentially leading to plaque
                    buildup in your arteries. While your blood sugar is within
                    normal range, your BMI of 27.5 puts you in the overweight
                    category, which can strain your heart.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Health Trends</CardTitle>
                  <CardDescription>
                    How your health metrics have changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    As this is your first assessment, we don't have historical
                    data to show trends. Regular assessments will help us track
                    changes in your heart health over time, allowing for more
                    personalized recommendations and early detection of
                    potential issues.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="next-steps">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                  <CardDescription>
                    Actions to improve your heart health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Schedule a follow-up appointment with your primary care
                      physician to discuss your assessment results.
                    </li>
                    <li>
                      Begin a structured exercise program, starting with 30
                      minutes of moderate activity 5 days a week.
                    </li>
                    <li>
                      Adopt a heart-healthy diet, focusing on fruits,
                      vegetables, whole grains, and lean proteins.
                    </li>
                    <li>
                      Monitor your blood pressure at home regularly and keep a
                      log to share with your doctor.
                    </li>
                    <li>
                      Consider stress-reduction techniques such as meditation,
                      deep breathing exercises, or yoga.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Remember, this AI-generated explanation is based on the
              information you provided and general health guidelines. It's not a
              substitute for professional medical advice.
            </p>
            <Button asChild>
              <Link href="/assessment">Retake Assessment</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
