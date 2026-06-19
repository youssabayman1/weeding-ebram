'use client';

import React from 'react';

interface ConnectionStatusProps {
  connected: boolean | null;
  error: string | null;
  checking: boolean;
  onRefresh: () => void;
}

export default function ConnectionStatus({
  connected,
  error,
  checking,
  onRefresh,
}: ConnectionStatusProps) {
  let statusText = 'Checking database...';
  let dotClass = 'loading';
  let bannerClass = 'neutral';

  if (connected === true) {
    statusText = 'Database Online';
    dotClass = 'online';
  } else if (connected === false) {
    statusText = 'Database Offline';
    dotClass = 'offline';
    bannerClass = 'danger';
  }

  return (
    <div className="glass-panel">
      <div className="panel-title">
        <span>System Status</span>
        <button 
          className="status-badge"
          onClick={onRefresh}
          disabled={checking}
          title="Re-check database connection"
          style={{ cursor: 'pointer', border: '1px solid var(--panel-border)', background: 'transparent' }}
        >
          <span className={`status-dot ${dotClass}`} />
          <span>{checking ? 'Testing...' : statusText}</span>
        </button>
      </div>

      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        <p style={{ marginBottom: '0.75rem' }}>
          This application connects a <strong>Next.js backend server</strong> (App Router API routes) to a <strong>MongoDB cluster</strong>.
        </p>

        {connected === true && (
          <div className="info-box" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#a7f3d0' }}>
            Connection verified! Your cluster has been successfully pinged. The server is ready to perform CRUD operations on the <code>todos</code> collection.
          </div>
        )}

        {connected === false && (
          <div className={`info-box ${bannerClass}`}>
            <strong>Connection Failed!</strong>
            <p style={{ marginTop: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', wordBreak: 'break-all' }}>
              {error || 'Could not establish connection to the specified MongoURI.'}
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
              Please check your `.env.local` settings and verify that your MongoDB Atlas cluster is online and allows connections from your IP address.
            </p>
          </div>
        )}

        {connected === null && (
          <div className="info-box neutral">
            Establishing server handshake and initializing connection pool...
          </div>
        )}
      </div>
    </div>
  );
}
