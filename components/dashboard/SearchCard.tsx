import React from "react";
import SavedItemCard from "./SavedItemCard";
import { Button } from "../ui/button";
import { Trash, ChevronDown, ChevronUp, ClipboardList, BarChart2, RefreshCcw } from "lucide-react";
import ComplaintChart from './ComplaintChart';
import UpdateProgressModal from './UpdateProgressModal';

interface SavedItem {
  id: string;
  title: string;
  description?: string;
  parentComplaintId: string;
}

interface Props {
  title: string;
  subtitle?: string;
  complaintId: string;
  savedItems: SavedItem[];
  onRemoveInjury: (injuryId: string, parentComplaintId: string) => void;
  onRemoveComplaint: (complaintId: string) => void;
  showChart?: boolean;
  onToggleChart?: () => void;
  injuryName?: string;
  urlComplaintId?: string;
}

const SearchCard: React.FC<Props> = ({
  title,
  subtitle,
  complaintId,
  savedItems,
  onRemoveInjury,
  onRemoveComplaint,
  showChart,
  onToggleChart,
  injuryName,
  urlComplaintId,
}) => {
  console.log("🧪 SearchCard props:", {
    complaintId,
    savedItems,
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [chartKey, setChartKey] = React.useState(0);
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-4 w-full flex flex-col animate-fade-in min-h-[340px] relative">

    {/* Title + delete button */}
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-xl sm:text-2xl gradient-text mb-1">Complaint</h2>
        <p className="text-white font-semibold text-sm sm:text-base">"{title}"</p>
        {subtitle && (
          <>
            <p className="text-sm font-semibold text-muted-foreground mt-4 mb-1">💡 AI Summary</p>
            <p className="text-muted-foreground text-sm sm:text-base">{subtitle}</p>
          </>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:bg-white-100"
        aria-label="Delete complaint"
        onClick={() => onRemoveComplaint(complaintId)}
      >
        <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </div>

    <div className="flex flex-row flex-wrap gap-2 mb-6 items-center justify-start">

      {onToggleChart && (
        <Button
          variant="outline"
          className="w-auto sm:w-auto flex items-center justify-center"
          onClick={onToggleChart}
          aria-label={showChart ? "Hide Chart" : "Show Chart"}
        >
          <BarChart2 className="w-4 h-4" />
          {showChart ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </Button>
      )}

      {showChart && (
        <Button
          variant="outline"
          className="w-auto sm:w-auto flex items-center justify-center gap-2"
          onClick={() => setModalOpen(true)}
          aria-label="Update Progress"
        >
          <RefreshCcw className="w-4 h-4" />
          Update Progress
        </Button>
      )}
    </div>

    <UpdateProgressModal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setChartKey(prev => prev + 1);
      }}
      complaintId={complaintId}
    />

    {showChart && (
      <div className="mb-6 w-full border rounded-lg p-1 bg-muted">
        <ComplaintChart key={chartKey} complaintId={complaintId} />
      </div>
    )}

    {/* Saved injuries */}
    {
      // Deduplicate items by id
    }
    {(() => {
      const uniqueItems = Array.from(new Map(savedItems.map(item => [item.id, item])).values());
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {uniqueItems.length > 0 ? (
            uniqueItems.map((item) => (
              <SavedItemCard
                key={item.id}
                title={item.title}
                description={item.description}
                onDelete={() => onRemoveInjury(item.id, item.parentComplaintId)}
                injuryId={item.id}
                parentComplaintId={item.parentComplaintId}
              />
            ))
          ) : (
            <div className="text-gray-400 text-center col-span-full">
              Injuries you view in detail will be saved here automatically.
            </div>
          )}
        </div>
      );
    })()}

    <Button
      className="mb-6 mt-6 w-full hover:text-blue-400 sm:w-auto"
      variant="secondary"
      onClick={() => window.location.href = `/injury-results?complaintId=${complaintId}`}
    >
      See Other Injury Suggestions
    </Button>
  </div>
  );
}

export default SearchCard;
