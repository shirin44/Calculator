"use client";
import Image from "next/image";

import style from "./Home.module.css";

import { Button, Input } from "antd";
import { useState } from "react";
//home is like the name of the page
const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const handleButtonClick = (buttonValue: string): void => {
    console.log(buttonValue);
    // Handle different button types
    if (buttonValue === "=") {
      handleCalculate();
    } else if (buttonValue === "+/-") {
      handleToggleSign();}
      else if (buttonValue === "AC") {
      handleClear();}
      else if (buttonValue === "%") { // Check for the percentage button
        handlePercentage();
    } else {
      // Concatenate digit or operator to the display value
      setDisplayValue((prevDisplay) => prevDisplay + buttonValue);
    }
  };
  const handlePercentage = (): void => {
    // Handle percentage calculation
    setDisplayValue((prevDisplay) => {
      const currentValue = parseFloat(prevDisplay);
      const percentageValue = currentValue / 100;
      return percentageValue.toString();
    });
  };
  
  const handleToggleSign = (): void => {
    // Toggle the sign of the current display value
    setDisplayValue((prevDisplay) => {
      // Check if the value is already negative
      if (prevDisplay.startsWith('-')) {
        return prevDisplay.slice(1); // Remove the negative sign
      } else {
        return `-${prevDisplay}`; // Add a negative sign
      }
    });
  };
  const handleClear = (): void => {
    // Clear the display value
    setDisplayValue("");
  };

  const handleCalculate = (): void => {
    try {
      // Evaluate and set the result
      const result = eval(displayValue);
      console.log(typeof result)

      if(!isFinite(result)) {
        setDisplayValue("Error");
        return
      }
      setDisplayValue(result.toString());
    } catch (error) {
      // Handle invalid expressions
      setDisplayValue("Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-6/12 h-2/3  bg-black p-5 ">
        <div className=" w-12/12 h-1/4 bg-slate-600 text-white text-5xl font-bold text-right  ">
        {displayValue}
        </div>
        <div className=" text-white text-3xl font-bold">
        <div className="grid grid-cols-4 gap-9 mt-5">
  {["AC", "+/-", "%", "/"].map((buttonValue) => (
    <button
      key={buttonValue}
      className="bg-gray-800 text-white p-4 text-2xl rounded-full"
      onClick={() => handleButtonClick(buttonValue)}
    >
      {buttonValue}
    </button>
  ))}
  {[7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+"].map((buttonValue) => (
    <button
      key={buttonValue}
      className={`${
        ["*", "-", "+", "/"].includes(buttonValue as string)
          ? "bg-white text-black"
          : "bg-gray-800 text-white"
      } p-2 rounded-full`}
      onClick={() => handleButtonClick(buttonValue.toString())}
    >
      {buttonValue}
    </button>
  ))}
  {["0", ".", "="].map((buttonValue) => (
    <button
      key={buttonValue}
      className={`${
        buttonValue === "=" ? "bg-blue-600" : "bg-gray-800"
      } text-white p-2 rounded-full`}
      onClick={() => handleButtonClick(buttonValue)}
    >
      {buttonValue}
    </button>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default Calculator;
