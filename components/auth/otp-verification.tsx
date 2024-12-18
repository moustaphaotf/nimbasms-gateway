"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useValidateGoogleOTP } from "@/hooks/api/use-auth";
import { ArrowLeft } from "lucide-react";
import { AuthStep, CheckUserResponse } from "@/lib/api/types";
import { useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "@/lib/constants";

interface OTPVerificationProps {
  requestOTPResponse: CheckUserResponse;
  setStep: (step: AuthStep) => void;
}

export function OTPVerification({
  requestOTPResponse,
  setStep,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const validateGoogleOTP = useValidateGoogleOTP();

  const handleVerify = async () => {
    try {
      const payload = {
        email: requestOTPResponse.email,
        otp,
      };
      await validateGoogleOTP.mutateAsync(payload);
      router.push(PROTECTED_ROUTES.DASHBOARD.url);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 items-center"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep("request")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Vérification du code</h2>
        </div>

        <InputOTP
          // @ts-ignore
          value={otp}
          onChange={setOtp}
          maxLength={6}
          // @ts-ignore
          render={({ slots }) => (
            <InputOTPGroup className="gap-2">
              {slots.map((slot: any, index: number) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />

        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={otp.length !== 6 || validateGoogleOTP.isPending}
        >
          {validateGoogleOTP.isPending ? "Vérification..." : "Vérifier"}
        </Button>
      </motion.div>
    </div>
  );
}
