export default function CardActivation() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Card Activation</h1>
        <div className="flex gap-2">
          <button className="btn-secondary">Bulk Card Activation</button>
          <button className="btn-primary">Activate</button>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-xs text-green-700">
        <span className="text-green-500">ℹ</span>
        Note: Activating a card enables all e-commerce transactions.
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-header w-8"><input type="checkbox" className="rounded" /></th>
              {['Card Number', 'Card Holder Name', 'AAN', 'Employee ID', 'Mobile Number', 'Email ID', 'Block Code', 'Action'].map(h => (
                <th key={h} className="table-header">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9} className="text-center py-16">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <svg viewBox="0 0 100 100" className="w-20 h-20">
                    <circle cx="50" cy="35" r="22" fill="#dbeafe" />
                    <ellipse cx="50" cy="72" rx="30" ry="15" fill="#bfdbfe" />
                    <circle cx="50" cy="30" r="14" fill="#3b82f6" />
                  </svg>
                  <p className="text-sm font-medium">There are no cards eligible for activation</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
          <span>« First «Previous Next» Last »</span>
        </div>
      </div>
    </div>
  );
}
