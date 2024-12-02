import { Button } from "./ui/button";

export default function Page() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-50 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Take Control of Your Heart Health
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Don't wait for symptoms to appear. Get your personalized heart health assessment today.
                </p>
              </div>
              <Button className="bg-red-500 text-white hover:bg-red-600">Start Your Assessment</Button>
            </div>
          </div>
        </section>
    );
}