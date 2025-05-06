import React from "react";
import SavedItemCard from "./SavedItemCard";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
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
}

const SearchCard: React.FC<Props> = ({
  title,
  subtitle,
  complaintId,
  savedItems,
  onRemoveInjury,
  onRemoveComplaint,
  showChart,
  onToggleChart
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [chartKey, setChartKey] = React.useState(0);
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-4 w-full flex flex-col animate-fade-in min-h-[340px] relative">

    {/* Title + delete button */}
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm sm:text-base mt-1">{subtitle}</p>
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

    {/* View suggestions */}
    <Button
      className="mb-6 w-full hover:text-blue-400 sm:w-auto"
      variant="secondary"
      onClick={() => window.location.href = `/injury-results?complaintId=${complaintId}`}
    >
      View Injury Suggestions
    </Button>

    <div className="flex gap-2 mb-4">
      {onToggleChart && (
        <Button
          className="hero-button-primary"
          onClick={onToggleChart}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </Button>
      )}
      <Button
        variant="outline"
        className="mb-4 self-start"
        onClick={() => setModalOpen(true)}
      >
        Update Progress
      </Button>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
      {savedItems.length > 0 ? (
        savedItems.map((item) => (
          <SavedItemCard
            key={item.id}
            title={item.title}
            description={item.description}
            onDelete={() => onRemoveInjury(item.id, item.parentComplaintId)}
            injuryId={item.id}
          />
        ))
      ) : (
        <div className="text-gray-400 text-center col-span-full">
          Injuries you view in detail will be saved here automatically.
        </div>
      )}
    </div>
  </div>
  );
}

export default SearchCard;
