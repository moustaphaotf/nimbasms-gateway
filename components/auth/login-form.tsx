"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { OTPVerification } from "./otp-verification";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/login.schema";
import { CheckUserResponse } from "@/lib/api/types";
import { RequestOTP } from "./request";
import { Setup2FA } from "./setup-2fa";

export type LoginStep = "request" | "verify" | "setup-2fa";

export function LoginForm() {
  const [step, setStep] = useState<LoginStep>("request");
  const [requestOTPResponse, setRequestOTPResponse] =
    useState<CheckUserResponse>();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    form.reset({ email: "" });
  }, [form]);

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {step === "request" && (
          <RequestOTP
            setStep={setStep}
            setRequestOTPResponse={setRequestOTPResponse}
          />
        )}

        {step === "setup-2fa" && (
          <Setup2FA
            setStep={setStep}
            requestOTPResponse={requestOTPResponse!}
          />
        )}

        {step === "verify" && (
          <OTPVerification
            requestOTPResponse={requestOTPResponse!}
            setStep={setStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
