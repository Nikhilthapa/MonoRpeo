'use client';

/**
 * Global error boundary - minimal client component
 * Must be 'use client' but kept extremely simple to avoid React 19 context issues
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#110128',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Error</h1>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              background: '#6366f1',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Go to Dashboard
          </a>
        </div>
      </body>
    </html>
  );
}

