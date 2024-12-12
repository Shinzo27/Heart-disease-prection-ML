"use client";

import { Button } from "@/components/ui/button";
import { useChat } from 'ai/react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  AlertTriangle,
  Brain,
  MessageCircle,
  Send,
  User,
  Utensils,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

const DetailsComponent = ({result, assessmentResult}: any) => {
  const [dietRecommendations, setDietRecommendations] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [problemAreas, setProblemAreas] = useState<string[]>([]);
  const [exerciseDetails, setExerciseDetails] = useState<string[]>([]);
  const [assessmentData, setAssessmentData] = useState<any>(assessmentResult);
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  useEffect(() => {
    console.log(assessmentResult);
    setExerciseDetails(result.data.dietRecommendation.exercises);
    setDietRecommendations(result.data.dietRecommendation.foods);
    setSuggestions(result.data.analysis.suggestions);
    setProblemAreas(result.data.analysis.problemAreas);
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
                <User className="h-6 w-6 text-yellow-500" />
                User Details
              </CardTitle>
              <CardDescription>
                Your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">
                      Email : {assessmentData.user.name}
                    </span>
                    <span className="text-sm font-medium">
                      Username : {assessmentData.user.email}
                    </span>
                    <span className="text-sm font-medium">
                      Assessment Id : {assessmentData.id}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      {assessmentData.prediction}%
                    </span>
                  </div>
                  <Progress
                    value={assessmentData.prediction}
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
                {problemAreas.map((problemArea, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{problemArea}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-green-500" />
                Diet Analysis
              </CardTitle>
              <CardDescription>Suggested dietary changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dietRecommendations.length === 0 ? (
                  <p>No dietary changes recommended</p>
                ) : (
                  dietRecommendations.map((dietRecommendation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{dietRecommendation}</h3>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                AI Suggestions
              </CardTitle>
              <CardDescription>
                Personalized suggestions for improving your heart health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {suggestions.length === 0 ? (
                  <p>No suggestions provided</p>
                ) : (
                  suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {suggestion}
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
              <CardDescription>Your exercise details</CardDescription>
            </CardHeader>
            <CardContent>
              {exerciseDetails.length === 0 ? (
                <p>No exercise details provided</p>
              ) : (
                exerciseDetails.map((exerciseDetail, index) => (
                  <div key={index} className="p-4 border rounded-lg mt-4">
                    <h3 className="font-semibold">{exerciseDetail}</h3>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

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
      {/* Chatbot Support */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
        {isChatOpen && (
          <Card className="w-[90vw] max-w-[600px] h-[80vh] max-h-[800px] flex flex-col shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Chat Support</CardTitle>
              <Button
                onClick={() => setIsChatOpen(false)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden py-6">
              <ScrollArea className="h-full w-full pr-4">
                {messages.map(m => (
                  <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-3 rounded-lg ${m.role === 'user' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                      {m.content}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow text-base"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailsComponent;