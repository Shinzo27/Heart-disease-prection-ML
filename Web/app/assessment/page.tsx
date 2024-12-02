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

export default function Assessment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPain: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    restingECG: "",
    maxHR: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "Assessment Submitted",
      description:
        "Your heart health assessment has been received. We'll process your results shortly.",
    });
    router.push('/result');
  };

  return (
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
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">Your current age in years.</p>
              </div>
              <div className="space-y-2">
                <Label>Sex</Label>
                <RadioGroup name="sex" value={formData.sex} onValueChange={(value) => handleSelectChange('sex', value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Your biological sex at birth.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chestPain">Chest Pain Type</Label>
                <Select name="chestPain" value={formData.chestPain} onValueChange={(value) => handleSelectChange('chestPain', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chest pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TA">Typical Angina</SelectItem>
                    <SelectItem value="ATA">Atypical Angina</SelectItem>
                    <SelectItem value="NAP">Non-Anginal Pain</SelectItem>
                    <SelectItem value="ASY">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The type of chest pain you experience, if any.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restingBP">Resting Blood Pressure (mm Hg)</Label>
                <Input
                  id="restingBP"
                  name="restingBP"
                  type="number"
                  placeholder="Enter resting BP"
                  value={formData.restingBP}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">Your blood pressure when you're at rest, measured in millimeters of mercury.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                <Input
                  id="cholesterol"
                  name="cholesterol"
                  type="number"
                  placeholder="Enter cholesterol level"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">Your total cholesterol level in milligrams per deciliter of blood.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fastingBS">Fasting Blood Sugar</Label>
                <Select name="fastingBS" value={formData.fastingBS} onValueChange={(value) => handleSelectChange('fastingBS', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fasting BS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Less than 120 mg/dL</SelectItem>
                    <SelectItem value="1">Greater than 120 mg/dL</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Your blood sugar level after fasting for at least 8 hours.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restingECG">Resting ECG</Label>
                <Select name="restingECG" value={formData.restingECG} onValueChange={(value) => handleSelectChange('restingECG', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resting ECG" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="ST">ST-T wave abnormality</SelectItem>
                    <SelectItem value="LVH">Left ventricular hypertrophy</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Results of your electrocardiogram when you're at rest.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxHR">Maximum Heart Rate</Label>
                <Input
                  id="maxHR"
                  name="maxHR"
                  type="number"
                  placeholder="Enter max heart rate"
                  value={formData.maxHR}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">The highest heart rate you've achieved during exercise.</p>
              </div>
              <div className="space-y-2">
                <Label>Exercise-Induced Angina</Label>
                <RadioGroup name="exerciseAngina" value={formData.exerciseAngina} onValueChange={(value) => handleSelectChange('exerciseAngina', value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Y" id="angina-yes" />
                    <Label htmlFor="angina-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="N" id="angina-no" />
                    <Label htmlFor="angina-no">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Whether you experience chest pain during physical activity.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldpeak">ST Depression (Oldpeak)</Label>
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
                          value={formData.oldpeak}
                          onChange={handleInputChange}
                          required
                        />
                        <HelpCircle className="h-4 w-4 ml-2 text-gray-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ST depression induced by exercise relative to rest. Measured in millimeters.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm text-gray-500">The ST segment depression observed during exercise testing.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stSlope">ST Slope</Label>
                <Select name="stSlope" value={formData.stSlope} onValueChange={(value) => handleSelectChange('stSlope', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ST slope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Up">Upsloping</SelectItem>
                    <SelectItem value="Flat">Flat</SelectItem>
                    <SelectItem value="Down">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">The slope of the ST segment during peak exercise.</p>
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
