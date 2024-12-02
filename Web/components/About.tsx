import { Activity, AlertCircle, Stethoscope } from "lucide-react";

export default function Page() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose HeartGuard AI?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Activity className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold">Advanced Analytics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our AI analyzes multiple health parameters to provide accurate risk assessments.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Stethoscope className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold">Expert-Backed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Developed in collaboration with leading cardiologists and data scientists.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold">Early Detection</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Identify potential risks before they become serious health issues.
                </p>
              </div>
            </div>
          </div>
        </section>
    );
}