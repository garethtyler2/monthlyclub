// components/shared/SEOContent.tsx
import React from "react";

type SEOContentSection = {
  heading?: string;
  content: string | React.ReactNode;
};

interface SEOContentProps {
  titleStart: string;
  titleHighlight: string;
  sections: SEOContentSection[];
}

const SEOContent = ({ titleStart, titleHighlight, sections }: SEOContentProps) => {
  return (
    <section className="max-w-3xl mx-auto px-4 md:px-0 py-16">
      <h2 className="text-3xl font-bold mb-6">{titleStart} <span className="gradient-text">{titleHighlight}</span></h2>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.heading && (
            <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
          )}
          <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-2">
            {typeof section.content === "string" ? (
              <p>{section.content}</p>
            ) : (
              section.content
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SEOContent;
