// src/components/SearchDashboard.tsx
import React from "react";
import SearchCard from "./SearchCard";

interface SavedItem {
  id: string;
  title: string;
  description?: string;
  parentComplaintId: string;
}

interface Search {
  id: string;
  title: string;
  subtitle?: string;
  savedItems: SavedItem[];
  showChart?: boolean;
  onToggleChart?: () => void;
  injuryName?: string;
  urlComplaintId?: string;
  hasRehabPlan?: boolean;
}

interface Props {
  searches: Search[];
  onRemoveInjury: (injuryId: string, parentComplaintId: string) => void;
  onRemoveComplaint: (complaintId: string) => void;
  showChartMap: { [complaintId: string]: boolean };
  onToggleChart: (complaintId: string) => void;
}

const SearchDashboard: React.FC<Props> = ({
  searches,
  onRemoveInjury,
  onRemoveComplaint,
  showChartMap,
  onToggleChart,
}) => {
  return (
    <div className="max-w-6xl mx-auto w-full py-10 px-4 flex flex-col gap-10">
      {searches.map((search) => (
        <SearchCard
          key={search.id}
          title={search.title}
          subtitle={search.subtitle}
          complaintId={search.id}
          savedItems={search.savedItems}
          onRemoveInjury={onRemoveInjury}
          onRemoveComplaint={onRemoveComplaint}
          showChart={showChartMap[search.id]}
          onToggleChart={() => onToggleChart(search.id)}
          injuryName={search.injuryName}
          urlComplaintId={search.urlComplaintId}
          hasRehabPlan={search.hasRehabPlan}
        />
      ))}
    </div>
  );
};

export default SearchDashboard;
