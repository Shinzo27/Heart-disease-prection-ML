"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Heart, Menu, User, Utensils } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const predictionResult = {
    riskLevel: "Moderate",
    riskPercentage: 65,
    keyFactors: [
      "High blood pressure",
      "Elevated cholesterol",
      "Sedentary lifestyle",
    ],
  };

  const dietPlans = [
    {
      name: "Mediterranean Diet",
      description:
        "Rich in fruits, vegetables, whole grains, and healthy fats.",
      benefits: [
        "Reduces risk of heart disease",
        "Lowers bad cholesterol",
        "Helps with weight management",
      ],
    },
    {
      name: "DASH Diet",
      description: "Designed to help treat or prevent high blood pressure.",
      benefits: [
        "Lowers blood pressure",
        "Reduces risk of heart disease",
        "Promotes weight loss",
      ],
    },
    {
      name: "Plant-Based Diet",
      description:
        "Focuses on foods from plant sources with limited animal products.",
      benefits: [
        "Lowers risk of heart disease",
        "Helps manage weight",
        "Reduces inflammation",
      ],
    },
  ];

  const recommendedDoctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "Heart Care Center",
      experience: "15 years",
      contact: "+1 (555) 123-4567",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Interventional Cardiologist",
      hospital: "City General Hospital",
      experience: "20 years",
      contact: "+1 (555) 987-6543",
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Preventive Cardiology",
      hospital: "Wellness Medical Group",
      experience: "12 years",
      contact: "+1 (555) 246-8135",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Your Heart Health Results
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Based on your provided information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {predictionResult.riskLevel} Risk
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {predictionResult.riskPercentage}% chance of heart disease
                  </p>
                </div>
                <AlertTriangle className="h-24 w-24 text-yellow-500" />
              </div>
              <div className="mt-4">
                <p className="font-semibold">
                  Key factors contributing to your risk:
                </p>
                <ul className="list-disc list-inside mt-2">
                  {predictionResult.keyFactors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="diet">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="diet">Recommended Diet Plans</TabsTrigger>
              <TabsTrigger value="doctors">Recommended Doctors</TabsTrigger>
            </TabsList>
            <TabsContent value="diet">
              <Card>
                <CardHeader>
                  <CardTitle>Diet Plans for Heart Health</CardTitle>
                  <CardDescription>
                    Tailored nutrition advice based on your risk factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dietPlans.map((plan, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Utensils className="h-5 w-5 mr-2 text-green-500" />
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        {plan.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="doctors">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Doctors</CardTitle>
                  <CardDescription>
                    Specialists who can provide further assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendedDoctors.map((doctor, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-500" />
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.hospital}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.experience} of experience
                      </p>
                      <p className="text-sm mt-1">Contact: {doctor.contact}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button asChild>
              <Link href="/details">Explain Assessment</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
