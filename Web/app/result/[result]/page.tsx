import ResultComponent from "@/components/ResultComponent";
import { getHealthMetrics } from "@/lib/db";

const page = async({ params }: { params: { result: number } }) => {
  const result = await getHealthMetrics(2);

  return (
    <ResultComponent result={result } />
  );
}

export default page;