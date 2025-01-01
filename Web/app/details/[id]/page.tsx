import DetailsComponent from "@/components/DetailsComponent";
import { getHealthMetrics, getPrediction } from "@/lib/db";
import MarkdownIt from "markdown-it";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const getData = await getHealthMetrics(Number(id))
    const predict = await getPrediction(getData);
    const md = new MarkdownIt();
    const parse = md.parse(predict, {})
    const result = JSON.parse(parse[0].content)
    
    return (
      <DetailsComponent result={result} assessmentResult={getData} />
    )
}