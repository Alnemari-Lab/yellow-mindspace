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
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      <Button 
        onClick={onGetAIAnalysis} 
        disabled={isAnalyzing}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        {isAnalyzing ? analyzingText : getAiAnalysisText}
      </Button>
      <Button 
        onClick={onRetakeTest} 
        variant="outline"
        className="border-orange-200 hover:bg-orange-50"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        {retakeTestText}
      </Button>
    </div>
  );
};