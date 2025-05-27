import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SubTopic {
  id: string;
  title: string;
  description: string;
}

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subtopics: SubTopic[];
  color: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ id, title, description, icon, subtopics, color }) => {
  return (
    <div id={id} className="topic-card animate-fade-in">
      <div className={`p-3 ${color}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/90 rounded-lg shadow-sm">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <Accordion type="single" collapsible className="w-full">
          {subtopics.map((subtopic) => (
            <AccordionItem key={subtopic.id} value={subtopic.id} className="border-b-0 last:border-0">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center justify-start w-full font-medium">
                  <span>{subtopic.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                <div className="text-sm text-gray-600 dark:text-gray-300 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                  {subtopic.description}
                </div>
                <div className="mt-2 flex justify-end">
                  <Link 
                    href={`/ai-rehab-insights/${id}/${subtopic.id}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Learn more 
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default TopicCard;