import { useState } from 'react';

export default function ReminderEngine() {
  const [days, setDays] = useState('3');
  const [frequency, setFrequency] = useState('1 time');
  const [channels, setChannels] = useState({ inApp: true, sms: false, email: true });
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="section-title mb-4">Reminder Engine</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Set Reminder by</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trigger Notification (days before due date)
              </label>
              <input
                value={days}
                onChange={e => setDays(e.target.value)}
                type="number"
                min="1"
                max="30"
                className="input-field max-w-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency (in a day)</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="input-field max-w-xs">
                <option>1 time</option>
                <option>2 times</option>
                <option>3 times</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Channel</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'inApp', label: 'In-app' },
                  { key: 'sms', label: 'SMS' },
                  { key: 'email', label: 'Email' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels[key as keyof typeof channels]}
                      onChange={e => setChannels(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="accent-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSaved(true)}
              className="btn-primary uppercase text-xs tracking-wider"
            >
              Submit
            </button>

            {saved && (
              <div className="badge-approved inline-block px-3 py-1.5 rounded text-sm">
                ✓ Reminder settings saved!
              </div>
            )}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Approvers:</h3>
          <div className="text-xs text-gray-500 mb-2">Level 1</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">AUS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
