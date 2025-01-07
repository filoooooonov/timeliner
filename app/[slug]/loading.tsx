import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="bg-background  justify-center flex flex-col">
      <div className="bg-neutral-800 w-full h-[16vw] flex items-center"></div>
      <span className="mt-[20vh] mx-auto flex items-center gap-2 text-neutral-300">
        <Loader2 className="animate-spin " />
        Loading...
      </span>
      {/* <div className="w-[65%] mx-auto bg-background mt-10">
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <Skeleton className="w-[250px] h-12" />

            <div className="space-y-12 mt-8">
              <div className="space-y-3">
                <Skeleton className="w-[400px] h-5" />
                <Skeleton className="w-[400px] h-5" />
                <Skeleton className="w-[380px] h-5" />
                <Skeleton className="w-[350px] h-5" />
              </div>

              <div className="flex flex-row gap-2">
                <Skeleton className="size-16 rounded-full" />
                <Skeleton className="size-16 rounded-full" />
              </div>
            </div>
          </div>

          <div className="ml-auto w-full flex flex-col col-span-2">
            <div className="ml-auto flex items-center ">
              <Skeleton className="w-[150px] h-5" />
            </div>
            <div className="ml-auto bg-neutral-900 rounded-md p-4 h-max min-w-[200px] mt-8">
              <Skeleton className="w-[150px] h-8" />

              <div className="space-y-3">
                <Skeleton className="w-[150px] h-5" />
                <Skeleton className="w-[150px] h-5" />
              </div>
            </div>
          </div>
        </div>

      </div> */}
    </div>
  );
};

export default LoadingPage;
