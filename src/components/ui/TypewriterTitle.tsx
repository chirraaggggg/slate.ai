"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(" 🚀 Supercharged Productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("👾 AI-Powered Insights.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("⚡ Intelligent Automation.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🧠 Smarter Workflow.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("✨ Seamless Integration.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("⚡ Lightning Fast.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🔄 Continuous Learning.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🔮 Future-Ready.")
          .pauseFor(1000)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypewriterTitle;