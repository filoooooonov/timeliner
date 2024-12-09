import HeaderMinimal from "@/components/HeaderMinimal";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[80vh] flex-col justify-center items-center gap-12">
      {children}
    </div>
  );
}
