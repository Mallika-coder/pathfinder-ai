import "./globals.css";

export const metadata = {
  title: "PathFinder AI",
  description: "Mapping the Unmapped. Saving the Unseen."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-crisis-bg text-white">
        {children}
      </body>
    </html>
  );
}
