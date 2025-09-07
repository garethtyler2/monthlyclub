'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TermsAndConditionsDisplayProps {
  terms: string;
}

export function TermsAndConditionsDisplay({ terms }: TermsAndConditionsDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="p-2">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-0 h-auto text-white hover:bg-white/10"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium">Custom Terms and Conditions</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                {terms}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
