import DetailsComponent from "@/components/DetailsComponent";
import { getHealthMetrics, getPrediction } from "@/lib/db";
import MarkdownIt from "markdown-it";

export default async function Page({ params }: { params: Promise<{ result: number }> }) {
    const getData = await getHealthMetrics(3)
    const predict = await getPrediction(getData);
    const md = new MarkdownIt();
    const parse = md.parse(predict, {})
    const result = JSON.parse(parse[0].content)
    console.log(getData);
    return (
      <DetailsComponent result={result} assessmentResult={getData} />
    )
}