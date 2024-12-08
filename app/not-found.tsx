import HeaderMinimal from "@/components/HeaderMinimal";

export default function Custom404() {
  return (
    <div>
      <HeaderMinimal />
      <div className="w-full bg-background h-screen flex items-center justify-center">
        <h1 className="text-3xl text-white">
          We could not find what you are looking for. Please, try again.
        </h1>
      </div>
    </div>
  );
}
