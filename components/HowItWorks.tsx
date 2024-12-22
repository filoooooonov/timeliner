"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 90);
    return () => clearInterval(progressInterval);
  }, []);

  // Once progress hits 100, reset and advance step
  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
      setActiveStep((prevStep) => (prevStep + 1) % 3);
    }
  }, [progress]);

  const steps = [
    {
      title: "Add your company",
      description:
        "Add entries that each correspond to a period in your company's development and share what happened then",
      color: "text-primary",
      gradient: "from-yellow-500 to-neutral-900",
    },
    {
      title: "Create your timeline",
      description:
        "Add entries that each correspond to a period in your company's development and share what happened then",
      color: "text-primary",
      gradient: "from-green-500 to-neutral-900",
    },
    {
      title: "Enjoy and share",
      description:
        "Your story is engraved in stone, now you can edit it and share your timeline with others!",
      color: "text-primary",
      gradient: "from-blue-500 to-neutral-900",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl py-20 px-5 md:px-0">
      <h2 className="text-neutral-200">How it works</h2>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-0">
        <div>
          {steps.map((step, index) => (
            <div
              key={index}
              className="mt-12 cursor-pointer"
              onClick={() => {
                setActiveStep(index);
                setProgress(0);
              }}
            >
              <div
                className={`py-5 ${activeStep === index ? step.color : "text-neutral-300"}`}
              >
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-neutral-400 text-sm mt-2">
                  {step.description}
                </p>
                <div className="relative h-1 bg-neutral-800 mt-4">
                  {activeStep === index ? (
                    <Progress value={progress} className="rounded-none h-1" />
                  ) : (
                    <div className="absolute h-full bg-neutral-800"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`w-[80%] lg:w-[60%] rounded-xl h-[600px] mx-auto md:ml-auto lg:ml-auto bg-gradient-to-tl ${steps[activeStep].gradient}`}
        ></div>
      </div>
    </div>
  );
};

export default HowItWorks;
