import './global.css';

export const metadata = {
  title: 'Admin Panel - HireNova',
  description: 'Admin panel for HireNova platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
