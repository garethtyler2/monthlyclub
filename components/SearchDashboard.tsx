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
  }
  

interface Props {
  searches: Search[];
  onRemoveInjury: (injuryId: string, parentComplaintId: string) => void;
  onRemoveComplaint: (complaintId: string) => void;
}

const SearchDashboard: React.FC<Props> = ({ searches, onRemoveInjury, onRemoveComplaint }) => {
  return (
    <div className="w-full py-10 px-4 flex flex-col gap-10">


      {searches.map((search) => (
        <SearchCard
        key={search.id}
        title={search.title}
        subtitle={search.subtitle}
        complaintId={search.id}
        savedItems={search.savedItems}
        onRemoveInjury={onRemoveInjury}
        onRemoveComplaint={onRemoveComplaint}
      />
      
      ))}
    </div>
  );
};

export default SearchDashboard;
