"use client"
import model from "@/lib/gemini";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownIt from "markdown-it";


interface Analysis {
  problemAreas: string[];
  suggestions: string[];
}

interface DietRecommendation {
  foods: string[];
  exercises: string[];
  supplements: string[];
}

const page = () => {
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
        }
        generate();
      }, []);
      
    return (
      <>
        <ReactMarkdown>{response}</ReactMarkdown>
        <div>
          {
            response.includes("data") &&
            <>
              <div>
                <h2>Analysis</h2>
                <div>
                    {
                      analysis.problemAreas.length > 0 &&
                      <div>
                        <h3>Problem Areas</h3>
                        <ul>
                          {analysis.problemAreas.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    }
                </div>
              </div>
              <div>
                <h2>Suggestions</h2>
                <div>
                    {
                      analysis.suggestions.length > 0 &&
                      <div>
                        <h3>Suggestions</h3>
                        <ul>
                          {analysis.suggestions.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    }
                </div>
              </div>
              <div>
                <h2>Diet Recommendation</h2>
                <div>
                    {
                      analysis.suggestions.length > 0 &&
                      <div>
                        <h3>Foods</h3>
                        <ul>
                          {dietRecommendation.foods.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    }
                    {
                      analysis.suggestions.length > 0 &&
                      <div>
                        <h3>Exercises</h3>
                        <ul>
                          {dietRecommendation.exercises.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    }
                    {
                      analysis.suggestions.length > 0 &&
                      <div>
                        <h3>Supplements</h3>
                        <ul>
                          {dietRecommendation.supplements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    }
                </div>
              </div>
            </>
          }
        </div>
      </>

    );
}

export default page;