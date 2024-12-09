"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import model from "@/lib/gemini";
import { AlertTriangle, Heart, Menu, User, Utensils } from "lucide-react";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

interface Analysis {
    problemAreas: string[];
    suggestions: string[];
  }
  
interface DietRecommendation {
    foods: string[];
    exercises: string[];
    supplements: string[];
}

const ResultComponent = (result: any) => {
    const id = result.result.id;
    const score = Math.round(result.result.prediction);
    const riskLevel = score < 30 ? "Low" : score < 70 ? "Medium" : "High";
    const [response, setResponse] = useState("");
    const [dietRecommendation, setDietRecommendation] = useState<DietRecommendation>({
      foods: [],
      exercises: [],
      supplements: []
    });
    const [analysis, setAnalysis] = useState<Analysis>({
      problemAreas: [],
      suggestions: []
    });
    const md = new MarkdownIt();
    const [loading, setLoading] = useState(true);
  
  const predictionResult = {
    riskLevel: riskLevel,
    riskPercentage: Math.round(score),
    keyFactors: analysis.problemAreas,
  };

  useEffect(() => {
    async function generate(){
        setLoading(true);
        try {
            const data = {
                "age": 63,
                "sex": 1,
                "cp": 3,
                "trestbps": 145,
                "chol": 233,
                "fbs": 1,
                "restecg": 0,
                "thalach": 150,
                "exang": 0,
                "oldpeak": 2.3,
                "slope": 0,
                "ca": 0,
                "thal": 1
              }
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
      
                  Provide a response in this format.`
              const result = await model.generateContent([prompt]);       
              setResponse(result.response.text());
              const parse = md.parse(result.response.text(), {});
              const json = JSON.parse(parse[0].content);
              setAnalysis(json.data.analysis);
              setDietRecommendation(json.data.dietRecommendation);
              console.log(json);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);   
        }
      }
      generate();
  }, []);

    return loading ? <Loader/> : (
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
                <AlertTriangle className={`h-24 w-24 ${predictionResult.riskPercentage > 75 ? "text-red-500" : predictionResult.riskPercentage > 50 ? "text-yellow-500" : "text-green-400"}`} />
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

          {/* <Tabs defaultValue="diet">
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
          </Tabs> */}

          <div className="text-center">
            <Button asChild>
              <Link href={`/details/${id}`}>Explain Assessment</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultComponent;