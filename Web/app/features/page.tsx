"use client"

import model from "@/lib/gemini";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const page = () => {
    const [response, setResponse] = useState("");

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
    
          const prompt = `These are my health data: ${JSON.stringify(data)}. Based on this data, I am getting a risk of heart disease 83.78%. please provide me danger signs and recommendations to reduce my risk of heart disease.`;
          const result = await model.generateContent([prompt]); 
          setResponse(result.response.text());
        }
        generate();
      }, []);
    return (
        <ReactMarkdown>{response}</ReactMarkdown>
    );
}

export default page;