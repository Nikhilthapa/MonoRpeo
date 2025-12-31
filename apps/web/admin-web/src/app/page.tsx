'use client';

export default function AdminDashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #110128, #1a0538, #0d0217)',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              // TODO: Add logout logic
              window.location.href = '/login';
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Total Users
            </p>
            <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              0
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Total Companies
            </p>
            <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              0
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Total Jobs
            </p>
            <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              0
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Active Sessions
            </p>
            <p style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              0
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2
            style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: '0 0 1rem 0',
            }}
          >
            Welcome to Admin Panel
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
            This is your admin dashboard. You can manage users, companies, jobs, and other
            platform settings from here.
          </p>
        </div>
      </div>
    </div>
  );
}
