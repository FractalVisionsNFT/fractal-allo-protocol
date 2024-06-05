import React from "react";

export default function SlideLoader() {
  return (
    <div className="w-full flex items-center justify-center flex-wrap overflow-hidden py-2 gap-1 lg:gap-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={` min-w-[300px] min-h-[300px] space-y-5 rounded-2xl bg-white/5 p-4
       bg-gradient-to-r from-transparent via-rose-100/10 to-transparent
         relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-rose-100/10 before:to-transparent
     isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10`}
        >
          <div className="w-full h-24 rounded-lg bg-rose-100/10"></div>
          <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
            <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
            <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 
 * 
 *   {[...Array(arrayLength)].map((_, index) => (
        <div
          key={index}
          className={`aspect-[1/1.1] rounded-[26px] ${
            isDesktop ? "w-[32%]" : "w-[90%]"
          }`}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            sx={{ height: "100%", borderRadius: "26px", flexShrink: "0" }}
          />
        </div>
      ))}
 */
