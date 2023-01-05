import React, { useState } from "react";
import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;

  phoneNumber: string;
  password: string;
  cPassword: string;
  dAddress: string;
}

export default function Register() {
  const [screen, setScreen] = useState<number>(0);
  const [formData, setFormData] = useState<RegisterData>({
    // First Step
    email: "",
    firstName: "",
    lastName: "",

    // Second Step
    phoneNumber: "",
    password: "",
    cPassword: "",
    dAddress: "",
  });

  const screenDisplay = () => {
    if (screen === 0) {
      return (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          setScreen={setScreen}
        />
      );
    } else {
      if (screen === 1) {
        return (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            setScreen={setScreen}
          />
        );
      }
    }
  };

  return <section>{screenDisplay()}</section>;
}
