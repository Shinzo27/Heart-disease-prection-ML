"use client"
import model from "@/lib/gemini";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const page = () => {
    const [response, setResponse] = useState("");
    const [analysis, setAnalysis] = useState("");

    useEffect(()=>{
        async function generate(){
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
                  "dietRecommendation": ["string"],
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
          console.log(result.response.text());
          setAnalysis(result.response.text());
        }
        generate();
      }, []);
      
    return (
      <>
        <ReactMarkdown>{response}</ReactMarkdown>
        <div>
          {
            response.includes("data") &&
            <div>
              <h2>Analysis</h2>
              <div>
                  <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          }
        </div>
      </>

    );
}

export default page;