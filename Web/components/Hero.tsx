"use client"

import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'; 
import model from "@/lib/gemini";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/assessment');
  }

  useEffect(()=>{
    async function generate(){
      const prompt = "Explain the difference between a computer and a human";
      const result = await model.generateContent([prompt]);
      console.log(result.response.text());
    }
    generate();
  })
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-red-50 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Predict Heart Disease Risk with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Our advanced AI system analyzes your health data to provide early
              warnings and personalized recommendations.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleClick}>
              Get Started
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}