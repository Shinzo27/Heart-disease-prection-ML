"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shield, Activity, Brain, CheckCircle, Users, BarChart, Clock } from "lucide-react"
import Footer from "./Footer"
import AppBar from "./AppBar"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-red-50">
          <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center  gap-8">
            <div className="flex flex-col gap-4 md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Protect Your Heart with AI-Powered Health Insights
              </h1>
              <p className="text-gray-600 md:text-xl">
                HeartGuard AI uses advanced artificial intelligence to assess your heart health risk factors and provide
                personalized recommendations for a healthier life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                  <Link href="/assessment">Start Your Assessment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose HeartGuard AI?</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Our platform combines medical expertise with cutting-edge AI technology to provide you with
                comprehensive heart health insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <Activity className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Comprehensive Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our detailed assessment analyzes over 15 key health factors to provide a holistic view of your heart
                    health status.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <Brain className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Advanced machine learning algorithms analyze your data to identify patterns and risk factors that
                    might be missed in traditional assessments.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive tailored lifestyle, diet, and exercise recommendations based on your specific health profile
                    and risk factors.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <BarChart className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitor your heart health improvements over time with easy-to-understand visualizations and progress
                    reports.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Expert Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access to our AI chatbot for immediate questions, plus resources to connect with healthcare
                    professionals.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Quick & Convenient</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Complete your assessment in under 5 minutes and receive instant insights about your heart health
                    status.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">Simple Process</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How HeartGuard AI Works</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Our streamlined process makes it easy to get valuable insights about your heart health in just a few
                steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-red-500">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Assessment</h3>
                <p className="text-gray-600">
                  Answer questions about your health history, lifestyle, and current symptoms in our comprehensive
                  assessment.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-red-500">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI algorithms analyze your data to identify risk factors and potential areas of concern.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-red-500">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Personalized Insights</h3>
                <p className="text-gray-600">
                  Receive detailed explanations of your results and personalized recommendations to improve your heart
                  health.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                <Link href="/assessment">Start Your Assessment Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Hear from people who have used HeartGuard AI to take control of their heart health.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">JD</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">John Doe</CardTitle>
                      <CardDescription>Age 52, Chicago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    "HeartGuard AI helped me identify my high blood pressure and cholesterol issues before they became
                    serious problems. The personalized recommendations were easy to follow and made a real difference."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">MS</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Maria Smith</CardTitle>
                      <CardDescription>Age 45, Boston</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    "As someone with a family history of heart disease, I was always worried about my risk. HeartGuard
                    AI gave me clear insights and actionable steps to improve my heart health."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">RJ</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Robert Johnson</CardTitle>
                      <CardDescription>Age 60, Seattle</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    "The AI explanations helped me understand my heart health in ways my doctor never had time to
                    explain. I feel more in control of my health now."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">FAQ</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Find answers to common questions about HeartGuard AI and heart health.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Is HeartGuard AI a substitute for medical advice?</h3>
                    <p className="text-gray-600">
                      No, HeartGuard AI is designed to complement, not replace, professional medical advice. Always
                      consult with healthcare professionals for diagnosis and treatment decisions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">How accurate are the assessments?</h3>
                    <p className="text-gray-600">
                      HeartGuard AI uses validated risk assessment models and machine learning algorithms trained on
                      large datasets. While highly accurate, it's still an estimation tool and should be used alongside
                      professional medical evaluation.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Is my health data secure?</h3>
                    <p className="text-gray-600">
                      Yes, we take data security seriously. All your health information is encrypted and stored
                      securely. We never share your personal health data with third parties without your explicit
                      consent.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="assessment" className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">How long does the assessment take?</h3>
                    <p className="text-gray-600">
                      The comprehensive assessment typically takes 3-5 minutes to complete, depending on how detailed
                      your responses are.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">What information do I need to provide?</h3>
                    <p className="text-gray-600">
                      You'll need to provide basic health information such as age, sex, blood pressure, cholesterol
                      levels, and lifestyle factors. Having recent lab results on hand will improve the accuracy of your
                      assessment.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">How often should I retake the assessment?</h3>
                    <p className="text-gray-600">
                      We recommend retaking the assessment every 3-6 months, or whenever you have significant changes in
                      your health status or lifestyle.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="technical" className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">What AI technology does HeartGuard use?</h3>
                    <p className="text-gray-600">
                      HeartGuard AI uses a combination of validated clinical risk models and advanced machine learning
                      algorithms, including neural networks trained on large cardiovascular health datasets.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Can I export my assessment results?</h3>
                    <p className="text-gray-600">
                      Yes, you can download your assessment results as a PDF report to share with your healthcare
                      provider.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Does HeartGuard AI work on all devices?</h3>
                    <p className="text-gray-600">
                      Yes, HeartGuard AI is a web-based application that works on all modern browsers, including mobile
                      devices, tablets, and desktop computers.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-red-500 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                Take Control of Your Heart Health Today
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Join thousands of users who have taken the first step toward a healthier heart with HeartGuard AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/assessment">Start Free Assessment</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-red-500"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-sm md:text-base">No credit card required</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

