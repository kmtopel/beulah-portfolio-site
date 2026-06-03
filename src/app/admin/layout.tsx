export const metadata = {
  title: "Sanity Studio",
  description: "Content management for Beulah Peters portfolio site"
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity-studio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        height: "100vh",
        width: "100vw"
      }}
    >
      {children}
    </div>
  );
}
