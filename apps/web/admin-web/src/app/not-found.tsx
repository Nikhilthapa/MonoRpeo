// Server component - no 'use client' directive
// Force dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #110128, #1a0538, #0d0217)',
        color: '#ffffff',
        padding: '2rem',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '500px',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffffff' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          The page you are looking for does not exist.
        </p>
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
            fontWeight: '500',
            transition: 'opacity 0.2s',
          }}
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

