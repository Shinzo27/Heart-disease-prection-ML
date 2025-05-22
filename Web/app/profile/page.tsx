"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  Heart,
  Menu,
  User,
  Calendar,
  BarChart2,
  Activity,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
  Download,
  Filter,
  FileText,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// Mock data for the dashboard
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  joinDate: "2023-01-15",
  age: 42,
  gender: "Female",
  lastAssessment: "2023-05-10",
  currentRiskScore: 45,
  previousRiskScore: 68,
  improvementPercentage: 34,
}

const assessmentHistory = [
  {
    id: "a1",
    date: "2023-05-10",
    riskScore: 45,
    riskLevel: "Moderate",
    keyFindings: "Improved blood pressure, reduced cholesterol",
    status: "improved",
  },
  {
    id: "a2",
    date: "2023-03-15",
    riskScore: 58,
    riskLevel: "Moderate",
    keyFindings: "High cholesterol, normal blood pressure",
    status: "stable",
  },
  {
    id: "a3",
    date: "2023-01-20",
    riskScore: 68,
    riskLevel: "High",
    keyFindings: "High blood pressure, high cholesterol, elevated blood sugar",
    status: "at-risk",
  },
  {
    id: "a4",
    date: "2022-11-05",
    riskScore: 65,
    riskLevel: "High",
    keyFindings: "High blood pressure, high cholesterol, family history",
    status: "at-risk",
  },
  {
    id: "a5",
    date: "2022-09-12",
    riskScore: 70,
    riskLevel: "High",
    keyFindings: "High blood pressure, high cholesterol, overweight",
    status: "at-risk",
  },
]

const healthMetrics = [
  {
    name: "Blood Pressure",
    current: 128,
    previous: 145,
    unit: "mm Hg",
    change: "down",
    changePercent: 12,
  },
  {
    name: "Cholesterol",
    current: 195,
    previous: 230,
    unit: "mg/dL",
    change: "down",
    changePercent: 15,
  },
  {
    name: "Blood Sugar",
    current: 105,
    previous: 118,
    unit: "mg/dL",
    change: "down",
    changePercent: 11,
  },
  {
    name: "BMI",
    current: 26.2,
    previous: 28.5,
    unit: "kg/m²",
    change: "down",
    changePercent: 8,
  },
]

// Chart data
const riskScoreHistory = [
  { month: "Sep", score: 70 },
  { month: "Nov", score: 65 },
  { month: "Jan", score: 68 },
  { month: "Mar", score: 58 },
  { month: "May", score: 45 },
]

const bloodPressureHistory = [
  { month: "Sep", value: 150 },
  { month: "Nov", value: 148 },
  { month: "Jan", value: 142 },
  { month: "Mar", value: 135 },
  { month: "May", value: 128 },
]

const cholesterolHistory = [
  { month: "Sep", value: 240 },
  { month: "Nov", value: 235 },
  { month: "Jan", value: 225 },
  { month: "Mar", value: 210 },
  { month: "May", value: 195 },
]

export default function Dashboard() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    status: number;
  } | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("/api/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: session?.user.email })
        })
        const data = await response.json()
        if(data.status === 200) {
          setUser(data)
        } else {
          setUser(null)
          router.push("/signin")
        }
      } catch (error) {
        console.error("Error fetching user data:", error); 
      }
    }
    getUserData()
  }, [])

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "improved":
        return "bg-green-100 text-green-800"
      case "stable":
        return "bg-blue-100 text-blue-800"
      case "at-risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Function to render simple bar chart
  const renderBarChart = (data: { month: string; score: number }[], maxValue = 100) => {
    return (
      <div className="flex items-end h-40 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative w-full">
              <div
                className="w-full bg-red-500 rounded-t"
                style={{ height: `${(item.score / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="mt-2 text-xs">{item.month}</span>
          </div>
        ))}
      </div>
    )
  }

  // Function to render simple line chart
  const renderLineChart = (data: { month: string; value: number }[], maxValue: number, color: string) => {
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item.value / maxValue) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="relative h-40 mt-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item.value / maxValue) * 100
            return <circle key={index} cx={x} cy={y} r="2" fill="white" stroke={color} strokeWidth="1" />
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {data.map((item, index) => (
            <span key={index} className="text-xs">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* User Profile Summary */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Card className="w-full md:w-1/3">
              <CardHeader className="pb-2">
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Id</span>
                      <span className="font-medium">{user?.id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500">Member Since</span>
                      <span className="font-medium">{user?.createdAt.trim().split("T")[0]}</span>
                    </div>
                    {/* <div className="flex flex-col">
                      <span className="text-gray-500">Last Assessment</span>
                      <span className="font-medium">{format(new Date(userData.lastAssessment), "MMM d, yyyy")}</span>
                    </div> */}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Current Health Status */}
            <Card className="w-full md:w-2/3">
              <CardHeader className="pb-2">
                <CardTitle>Current Health Status</CardTitle>
                <CardDescription>Based on your latest assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Current Risk Score</div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">{userData.currentRiskScore}%</span>
                      <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Moderate Risk
                      </Badge>
                    </div>
                    <Progress value={userData.currentRiskScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Previous Risk Score</div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">{userData.previousRiskScore}%</span>
                      <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                        High Risk
                      </Badge>
                    </div>
                    <Progress value={userData.previousRiskScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">Improvement</div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-green-600">{userData.improvementPercentage}%</span>
                      <TrendingDown className="ml-2 h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-gray-600">Since last assessment</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border">
                      <div className="text-sm font-medium text-gray-500">{metric.name}</div>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-xl font-semibold">{metric.current}</span>
                        <span className="ml-1 text-xs text-gray-500">{metric.unit}</span>
                      </div>
                      <div className="mt-1 flex items-center text-xs">
                        {metric.change === "down" ? (
                          <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={metric.change === "down" ? "text-green-600" : "text-red-600"}>
                          {metric.changePercent}% from {metric.previous} {metric.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-red-500 hover:bg-red-600">
                  <Link href="/assessment">Take New Assessment</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Health Trends */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Health Trends</h2>
            <Tabs defaultValue="risk" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="risk">Risk Score</TabsTrigger>
                <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
                <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
              </TabsList>
              <TabsContent value="risk">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Score Trend</CardTitle>
                    <CardDescription>Your heart health risk score over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderBarChart(riskScoreHistory)}
                    <div className="mt-4 text-sm text-gray-500 text-center">
                      Your risk score has decreased by 25 points over the last 8 months, showing significant improvement
                      in your heart health.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="bp">
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Pressure Trend</CardTitle>
                    <CardDescription>Systolic blood pressure readings over time (mm Hg)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderLineChart(bloodPressureHistory, 200, "#ef4444")}
                    <div className="mt-4 text-sm text-gray-500 text-center">
                      Your blood pressure has steadily decreased from hypertensive to near-normal levels.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="cholesterol">
                <Card>
                  <CardHeader>
                    <CardTitle>Cholesterol Trend</CardTitle>
                    <CardDescription>Total cholesterol readings over time (mg/dL)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderLineChart(cholesterolHistory, 300, "#3b82f6")}
                    <div className="mt-4 text-sm text-gray-500 text-center">
                      Your cholesterol has decreased from high to borderline optimal levels.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Assessment History */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Assessment History</h2>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Records</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                    <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
                    <DropdownMenuItem>Last Year</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead className="hidden md:table-cell">Key Findings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessmentHistory.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{format(new Date(assessment.date), "MMM d, yyyy")}</TableCell>
                        <TableCell>{assessment.riskScore}%</TableCell>
                        <TableCell>{assessment.riskLevel}</TableCell>
                        <TableCell className="hidden md:table-cell">{assessment.keyFindings}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assessment.status)}>
                            {assessment.status === "improved" && "Improved"}
                            {assessment.status === "stable" && "Stable"}
                            {assessment.status === "at-risk" && "At Risk"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Report</DropdownMenuItem>
                              <DropdownMenuItem>Compare</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <Activity className="h-5 w-5 text-red-500" />
                  </div>
                  <CardTitle>Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Continue with your 30-minute daily walks and consider adding 2 days of strength training per week to
                    further improve heart health.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-red-500">
                    View Exercise Plan
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-green-500"
                    >
                      <path d="M11 4c2 0 3 1 3 3v5c0 2-1 3-3 3s-3-1-3-3V7c0-2 1-3 3-3Z"></path>
                      <path d="M17 12c.7 0 1.4.1 2 .3"></path>
                      <path d="M19.7 17.7c.2-.4.3-.8.3-1.2 0-1.9-1.8-3.5-4-3.5s-4 1.6-4 3.5c0 .4.1.8.3 1.2"></path>
                      <path d="M5 12c-.7 0-1.4.1-2 .3"></path>
                      <path d="M4.3 17.7c-.2-.4-.3-.8-.3-1.2 0-1.9 1.8-3.5 4-3.5s4 1.6 4 3.5c0 .4-.1.8-.3 1.2"></path>
                      <path d="M12 4v3"></path>
                      <path d="M4 22c1-3 2.5-4 6-4h4c3.5 0 5 1 6 4"></path>
                    </svg>
                  </div>
                  <CardTitle>Diet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your reduced sodium intake has helped lower your blood pressure. Continue with the DASH diet and
                    increase intake of omega-3 rich foods.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-red-500">
                    View Meal Plans
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Medical Follow-up</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Schedule a follow-up with your doctor to discuss your improved cholesterol levels and potentially
                    adjust your medication.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-red-500">
                    Find Healthcare Providers
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-red-500 hover:bg-red-600">
              <Link href="/assessment">
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Link>
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Reminder
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Share with Doctor
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
