import HeaderMinimal from "@/components/HeaderMinimal";
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[80vh] flex-col justify-center items-center gap-12">
      <Toaster position="bottom-center" />

      {children}
    </div>
  );
}
