import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '1.25rem',
        marginBottom: '2rem',
      }}
    >
      {/* Logo Icon - Purple and Pink H */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '0.5rem',
          background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        H
      </div>
      <span>HireNova</span>
    </Link>
  );
}

