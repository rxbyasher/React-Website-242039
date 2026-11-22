import React, { useState } from 'react';
import { tourService } from '../services/tourService.js';
import { storage } from '../utils/storage.js';
import { Trash2 } from 'lucide-react';

export default function DemoToolbar({ onStateChange }) {
  const [config, setConfig] = useState(tourService.getDemoConfig());
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleToggleError = (e) => {
    const forceError = e.target.checked;
    tourService.setDemoConfig({ forceError });
    setConfig(prev => ({ ...prev, forceError }));
    if (onStateChange) onStateChange();
  };

  const handleToggleSoldOut = (e) => {
    const forceSoldOut = e.target.checked;
    tourService.setDemoConfig({ forceSoldOut });
    setConfig(prev => ({ ...prev, forceSoldOut }));
    if (onStateChange) onStateChange();
  };

  const handleClearDraft = () => {
    storage.clearBookingDraft();
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 2500);
    if (onStateChange) onStateChange();
  };

  return (
    <aside className="demo-toolbar" aria-label="Demo Testing Controls">
      <div className="demo-toolbar-controls">
        <label className="demo-toggle-label">
          <input
            type="checkbox"
            checked={config.forceError}
            onChange={handleToggleError}
          />
          <span>Simulate Network Failure</span>
        </label>

        <label className="demo-toggle-label">
          <input
            type="checkbox"
            checked={config.forceSoldOut}
            onChange={handleToggleSoldOut}
          />
          <span>Simulate Sold-Out Seats</span>
        </label>

        <button
          type="button"
          onClick={handleClearDraft}
          className="btn btn-secondary btn-sm"
          style={{
            padding: '0.2rem 0.65rem',
            fontSize: '0.75rem',
            background: '#374151',
            color: '#f9fafb',
            borderColor: '#4b5563',
            borderRadius: 'var(--radius-sm)'
          }}
          title="Clears localStorage booking draft to test fresh state"
        >
          <Trash2 size={12} aria-hidden="true" />
          <span>{clearedNotice ? 'Draft Cleared!' : 'Clear Saved Draft'}</span>
        </button>
      </div>
    </aside>
  );
}
