"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Heart, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios'
import Loader from "@/components/Loader";

export default function Assessment() {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [cp, setCp] = useState("");
  const [trestbps, setTrestbps] = useState("");
  const [chol, setChol] = useState("");
  const [fbs, setFbs] = useState("");
  const [restecg, setRestecg] = useState("");
  const [thalach, setThalach] = useState("");
  const [exang, setExang] = useState("");
  const [oldpeak, setOldpeak] = useState("");
  const [slope, setSlope] = useState("");
  const [ca, setCa] = useState("");
  const [thal, setThal] = useState("");
  const [loading, setLoading] = useState(false);

  const data = {
    age: Number(age),
    sex: Number(sex),
    cp: Number(cp),
    trestbps: Number(trestbps),
    chol: Number(chol),
    fbs: Number(fbs),
    restecg: Number(restecg),
    thalach: Number(thalach),
    exang: Number(exang),
    oldpeak: Number(oldpeak),
    slope: Number(slope),
    ca: Number(ca),
    thal: Number(thal),
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const prediction = Math.round(res.data.prediction);
      if(prediction){
        const insert = await fetch("/api/assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: age,
            sex: sex,
            cp: cp,
            trestbps: trestbps,
            chol: chol,
            fbs: fbs,
            restecg: restecg,
            thalach: thalach,
            exang: exang,
            oldpeak: oldpeak,
            slope: slope,
            ca: ca,
            thal: thal,
            prediction: prediction,
          }),
        });
        if(insert){
          const data = await insert.json();
          if(data.status === "success"){
            toast({
              title: "Assessment Submitted",
              description:
                "Your heart health assessment has been received. We'll process your results shortly.",
            });
            router.push(`/result/${data.data.id}`);
          } else {
            toast({
              title: "Assessment Not Submitted",
              description:
                "Your heart health assessment has not been received. Please try again later.",
            });
          }
        }
      } else {
        toast({
          title: "Assessment Not Submitted",
          description:
            "Your heart health assessment has not been received. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? <Loader /> : (
    <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="text-3xl font-bold">Heart Health Assessment</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  required
                />
                <p className="text-sm text-gray-500">Your current age in years (1-120).</p>
              </div>
              <div className="space-y-2">
                <Label>Sex</Label>
                <RadioGroup name="sex" value={sex} onValueChange={(value) => setSex(value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Your biological sex at birth.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cp">Chest Pain Type</Label>
                <Select name="cp" value={cp} onValueChange={(value) => setCp(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chest pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Typical Angina</SelectItem>
                    <SelectItem value="1">Atypical Angina</SelectItem>
                    <SelectItem value="2">Non-Anginal Pain</SelectItem>
                    <SelectItem value="3">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The type of chest pain you experience, if any.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
                <Input
                  id="trestbps"
                  name="trestbps"
                  type="number"
                  placeholder="Enter resting BP"
                  value={trestbps}
                  onChange={(e) => setTrestbps(e.target.value)}
                  min="60"
                  max="250"
                  required
                />
                <p className="text-sm text-gray-500">Your resting blood pressure (60-250 mm Hg).</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chol">Serum Cholesterol (mg/dl)</Label>
                <Input
                  id="chol"
                  name="chol"
                  type="number"
                  placeholder="Enter cholesterol level"
                  value={chol}
                  onChange={(e) => setChol(e.target.value)}
                  min="100"
                  max="600"
                  required
                />
                <p className="text-sm text-gray-500">Your serum cholesterol level (100-600 mg/dl).</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fbs">Fasting Blood Sugar {">"} 120 mg/dl</Label>
                <RadioGroup name="fbs" value={fbs} onValueChange={(value) => setFbs(value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="fbs-yes" />
                    <Label htmlFor="fbs-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="fbs-no" />
                    <Label htmlFor="fbs-no">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Is your fasting blood sugar greater than 120 mg/dl?</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restecg">Resting Electrocardiographic Results</Label>
                <Select name="restecg" value={restecg} onValueChange={(value) => setRestecg(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ECG result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                    <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Your resting electrocardiographic results.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thalach">Maximum Heart Rate Achieved</Label>
                <Input
                  id="thalach"
                  name="thalach"
                  type="number"
                  placeholder="Enter max heart rate"
                  value={thalach}
                  onChange={(e) => setThalach(e.target.value)}
                  min="60"
                  max="220"
                  required
                />
                <p className="text-sm text-gray-500">Your maximum heart rate achieved (60-220 bpm).</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exang">Exercise Induced Angina</Label>
                <RadioGroup name="exang" value={exang} onValueChange={(value) => setExang(value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="exang-yes" />
                    <Label htmlFor="exang-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="exang-no" />
                    <Label htmlFor="exang-no">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Do you experience chest pain during exercise?</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldpeak">ST Depression Induced by Exercise Relative to Rest</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <Input
                          id="oldpeak"
                          name="oldpeak"
                          type="number"
                          step="0.1"
                          placeholder="Enter ST depression"
                          value={oldpeak}
                          onChange={(e) => setOldpeak(e.target.value)}
                          min="0"
                          max="6.2"
                          required
                        />
                        <HelpCircle className="h-4 w-4 ml-2 text-gray-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ST depression induced by exercise relative to rest (0-6.2 mm).</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm text-gray-500">The ST segment depression observed during exercise testing.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slope">The Slope of the Peak Exercise ST Segment</Label>
                <Select name="slope" value={slope} onValueChange={(value) => setSlope(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ST slope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Upsloping</SelectItem>
                    <SelectItem value="1">Flat</SelectItem>
                    <SelectItem value="2">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The slope of the ST segment during peak exercise.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ca">Number of Major Vessels Colored by Fluoroscopy</Label>
                <Select name="ca" value={ca} onValueChange={(value) => setCa(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of vessels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The number of major blood vessels colored by fluoroscopy (0-3).</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thal">Thalassemia</Label>
                <Select name="thal" value={thal} onValueChange={(value) => setThal(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select thalassemia type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Normal</SelectItem>
                    <SelectItem value="2">Fixed Defect</SelectItem>
                    <SelectItem value="3">Reversible Defect</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The type of thalassemia (a blood disorder affecting hemoglobin).</p>
              </div>
            </div>
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
              Submit Assessment
            </Button>
          </form>
        </div>
    </div>
  );
}