import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { mockFAQs } from '../data/mockData';

export default function FAQs() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="section-title mb-0">Frequently Asked Questions</h1>
          <div className="text-xs text-gray-400 mt-0.5">{mockFAQs.length} Questions</div>
        </div>
        <button className="btn-secondary flex items-center gap-1.5">
          <Filter size={14} /> FILTER
        </button>
      </div>

      <div className="space-y-3">
        {mockFAQs.map(faq => (
          <div key={faq.id} className="card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-medium text-sm min-w-[2rem]">{faq.id}</span>
                <span className="text-sm font-medium text-gray-800">{faq.question}</span>
              </div>
              {expanded === faq.id ? (
                <ChevronUp size={16} className="text-gray-400 shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-gray-400 shrink-0" />
              )}
            </button>
            {expanded === faq.id && (
              <div className="px-4 pb-4 pl-14 text-sm text-gray-600 border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
