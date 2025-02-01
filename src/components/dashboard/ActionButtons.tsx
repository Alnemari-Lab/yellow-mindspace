import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  onRetakeTest: () => void;
  onGetAIAnalysis: () => void;
  onViewMajors?: () => void;
  isAnalyzing: boolean;
  getAiAnalysisText: string;
  analyzingText: string;
  retakeTestText: string;
  viewMajorsText?: string;
}

export const ActionButtons = ({
  onRetakeTest,
  onViewMajors,
  isAnalyzing,
  getAiAnalysisText,
  analyzingText,
  retakeTestText,
  viewMajorsText = "View Majors",
}: ActionButtonsProps) => {
  const navigate = useNavigate();

  const handleAnalysisClick = () => {
    navigate('/analysis');
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      <Button 
        onClick={handleAnalysisClick} 
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
      {onViewMajors && (
        <Button
          onClick={onViewMajors}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          {viewMajorsText}
        </Button>
      )}
    </div>
  );
};