import React, { useState } from "react";
import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";

export default function Register() {
  const [screen, setScreen] = useState<number>(0);

  const screenDisplay = () => {
    if (screen === 0) {
      return <StepOne setScreen={setScreen} />;
    } else {
      if (screen === 1) {
        return <StepTwo setScreen={setScreen} />;
      }
    }
  };

  return <section>{screenDisplay()}</section>;
}
