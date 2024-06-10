export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="eng">
        <body>
          {children}
        </body>
      </html>
    );
  }