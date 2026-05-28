import { useState } from 'react';
import { Search } from 'lucide-react';

type Tab = 'All' | 'Approved' | 'Pending' | 'Rejected';

export default function RequestsRaised() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [search, setSearch] = useState('');
  const tabs: Tab[] = ['All', 'Approved', 'Pending', 'Rejected'];

  return (
    <div>
      <div className="mb-4">
        <h1 className="section-title mb-0">Request Raised</h1>
        <p className="text-xs text-gray-500 mt-0.5">Raise requests from here.</p>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search"
          className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none"
        />
      </div>

      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="40" r="20" fill="#dbeafe" />
            <ellipse cx="50" cy="75" rx="30" ry="15" fill="#bfdbfe" />
            <circle cx="50" cy="35" r="12" fill="#3b82f6" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">You've not raised any requests yet!</p>
      </div>
    </div>
  );
}
