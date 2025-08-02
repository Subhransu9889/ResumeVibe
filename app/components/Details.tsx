import React from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '../components/Accordion';
import { cn } from '../lib/utils';

// Assumed Feedback type structure based on requirements
type Tip = {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
};

type Category = {
  title: string;
  score: number;
  tips: Tip[];
};

type Feedback = {
  toneAndStyle: Category;
  content: Category;
  structure: Category;
  skills: Category;
};

// Helper function to render a score badge with appropriate colors
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  // Determine color based on score
  const isGood = score > 74;
  const isAverage = score > 39;
  
  return (
    <div className={cn(
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      {
        'bg-green-100 text-green-800': isGood,
        'bg-yellow-100 text-yellow-800': !isGood && isAverage,
        'bg-red-100 text-red-800': !isGood && !isAverage,
      }
    )}>
      {isGood && (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span>{score}/100</span>
    </div>
  );
};

// Helper function to render a category header with title and score badge
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({ title, categoryScore }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-lg font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// Helper function to render category content with tips
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
  return (
    <div className="space-y-4">
      {/* Two-column grid for tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-2">
            {tip.type === 'good' ? (
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>
      
      {/* Explanation boxes */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn(
              'p-3 rounded-md text-sm',
              {
                'bg-green-50 border border-green-100': tip.type === 'good',
                'bg-yellow-50 border border-yellow-100': tip.type === 'improve',
              }
            )}
          >
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Details component
const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  return (
    <div className="w-full">
      <Accordion className="w-full" allowMultiple>
        {/* Tone & Style Section */}
        <AccordionItem id="tone-style" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader 
              title="Tone & Style" 
              categoryScore={feedback.toneAndStyle.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        {/* Content Section */}
        <AccordionItem id="content" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="content">
            <CategoryHeader 
              title="Content" 
              categoryScore={feedback.content.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        {/* Structure Section */}
        <AccordionItem id="structure" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="structure">
            <CategoryHeader 
              title="Structure" 
              categoryScore={feedback.structure.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        {/* Skills Section */}
        <AccordionItem id="skills" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="skills">
            <CategoryHeader 
              title="Skills" 
              categoryScore={feedback.skills.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
