"use client";

import React, { useState, useEffect } from "react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % 3);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="mx-auto max-w-5xl py-20">
      <h2 className="text-neutral-200">How it works</h2>
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <div>
          {steps.map((step, index) => (
            <div
              key={index}
              className="mt-12 cursor-pointer"
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`py-5 ${activeStep === index ? step.color : "text-neutral-300"}`}
              >
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-neutral-400 text-sm mt-2">
                  {step.description}
                </p>
                <div className="relative h-1 bg-neutral-800 mt-4">
                  <div
                    className={`absolute h-full ${activeStep === index ? "bg-primary" : "bg-neutral-800"}`}
                    style={{
                      width: `${activeStep === index ? 100 : 0}%`,
                      transition: "width 9s linear",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`w-[80%] lg:w-[60%] rounded-xl h-[600px] ml-auto lg:ml-auto bg-gradient-to-tl ${steps[activeStep].gradient}`}
        ></div>
      </div>
    </div>
  );
};

export default HowItWorks;
