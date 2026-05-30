export const metadata = {
  title: 'AI Toolkit Playbook',
  description: 'Route any task to the right tool — every time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
