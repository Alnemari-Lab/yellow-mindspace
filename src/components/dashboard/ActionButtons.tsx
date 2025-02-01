import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw } from "lucide-react";

interface ActionButtonsProps {
  onRetakeTest: () => void;
  onGetAIAnalysis: () => void;
  isAnalyzing: boolean;
  getAiAnalysisText: string;
  analyzingText: string;
  retakeTestText: string;
}

export const ActionButtons = ({
  onRetakeTest,
  onGetAIAnalysis,
  isAnalyzing,
  getAiAnalysisText,
  analyzingText,
  retakeTestText,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onGetAIAnalysis} disabled={isAnalyzing}>
        <Wand2 className="mr-2 h-4 w-4" />
        {isAnalyzing ? analyzingText : getAiAnalysisText}
      </Button>
      <Button onClick={onRetakeTest} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        {retakeTestText}
      </Button>
    </div>
  );
};