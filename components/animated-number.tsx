"use client";
//@ts-ignore
import AnimatedNumber from "react-animated-number";

export default function AppAnimatedNumber(props: { count: number }) {
  return (
    <AnimatedNumber
      component="text"
      value={props.count}
      style={{
        color: "black",
        transition: "0.8s ease-out",
        transitionProperty: "background-color, color, opacity",
      }}
      duration={600}
      formatValue={(n: string) => parseInt(n ?? 0)}
    />
  );
}
