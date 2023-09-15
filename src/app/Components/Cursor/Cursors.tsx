"use client";

import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Cursors() {
  return (
    <div>
      <AnimatedCursor
    
        innerSize={0}
        outerSize={30}
        color="255, 255, 0"
        outerAlpha={0.6}
        innerScale={2}
        outerScale={0}
        trailingSpeed={10}
        showSystemCursor={true}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
          "video",

          {
            target: ".custom",
          },
        ]}
      />
    </div>
  );
}