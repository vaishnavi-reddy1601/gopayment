import { useState } from 'react';
import { mockBillerCategories } from '../../data/mockData';

interface CategoryViewProps {
  category: typeof mockBillerCategories[0];
  onBack: () => void;
}

function CategoryView({ category, onBack }: CategoryViewProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-bold">Bharat</span>
          <span className="text-orange-700 font-bold">Connect</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        <span className="text-blue-600 cursor-pointer" onClick={onBack}>Categories</span> &rsaquo; {category.name}
      </div>

      <div className="card p-5 max-w-md">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Pay your {category.name} Bill</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Category *</label>
          <select className="input-field">
            <option>Select</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
            <div className="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center text-xl">
              {category.icon}
            </div>
            <span className="text-xs text-gray-600 text-center max-w-[60px] truncate">
              {category.name.slice(0, 10)}...
            </span>
          </div>
        </div>

        <button className="btn-primary">Fetch Bill</button>
      </div>

      {category.savedBillers.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Saved Billers</h4>
          <div className="flex flex-wrap gap-3">
            {category.savedBillers.map(biller => (
              <div key={biller} className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
                <div className="w-14 h-14 border-2 border-gray-200 rounded-lg flex items-center justify-center text-xl">
                  {category.icon}
                </div>
                <span className="text-xs text-gray-600 text-center max-w-[70px]">{biller.split('(')[0].trim()}</span>
                <span className="text-xs text-gray-400">{biller.match(/\(([^)]+)\)/)?.[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BillerCategories() {
  const [selected, setSelected] = useState<typeof mockBillerCategories[0] | null>(null);

  if (selected) {
    return <CategoryView category={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-orange-500 font-bold text-lg">Bharat</span>
          <span className="text-orange-700 font-bold text-lg ml-1">Connect</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Utilities</h2>

      <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-4 mb-6">
        {mockBillerCategories.map(cat => (
          <div
            key={cat.name}
            onClick={() => setSelected(cat)}
            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-2xl hover:border-blue-300 transition-colors">
              {cat.icon}
            </div>
            <span className="text-xs text-gray-600 font-medium text-center w-16">{cat.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
          <div className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-2xl hover:border-blue-300">
            🗂️
          </div>
          <span className="text-xs text-gray-600 font-medium text-center w-16">All Categories</span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-700 mb-3">Saved Billers</h3>
      <div className="flex flex-wrap gap-4">
        {mockBillerCategories.flatMap(cat =>
          cat.savedBillers.map(biller => (
            <div key={biller} className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
              <div className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs text-gray-600 text-center max-w-[70px]">{biller.split('(')[0].trim()}</span>
              <span className="text-xs text-gray-400 text-center">{biller.match(/\(([^)]+)\)/)?.[1]}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        © 2026, Instant Global Paytech Private Limited &nbsp;|&nbsp; Version: 2026.05.26-03.53.23 &nbsp;|&nbsp; Customer Care: 022-62143030 &nbsp;|&nbsp; Email: support@go.ooo
      </div>
    </div>
  );
}
