import { useState } from 'react';

type Tab = 'properties' | 'theme' | 'code';

export function PanelTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('properties');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'properties', label: 'Properties' },
    { id: 'theme', label: 'Theme' },
    { id: 'code', label: 'Code' },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <p className="text-sm text-slate-500">
          {activeTab === 'properties' && 'Properties panel - Week 4'}
          {activeTab === 'theme' && 'Theme panel - Week 8'}
          {activeTab === 'code' && 'Code panel - Week 11'}
        </p>
      </div>
    </div>
  );
}
