import ResultComponent from "@/components/ResultComponent";
import { getHealthMetrics } from "@/lib/db";

const page = async({ params }: { params: { result: number } }) => {
  console.log(params.result);
  const result = await getHealthMetrics(Number(params.result));

  return (
    <ResultComponent result={result} />
  );
}

export default page;