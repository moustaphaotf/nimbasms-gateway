"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useValidateEmailOTP,
  useValidateMobileOTP,
} from "@/hooks/api/use-auth";
import { ArrowLeft } from "lucide-react";

interface OTPVerificationProps {
  pinUid: string;
  method: "email" | "phone";
  onBack: () => void;
}

export function OTPVerification({
  pinUid,
  method,
  onBack,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const validateEmailOTP = useValidateEmailOTP();
  const validateMobileOTP = useValidateMobileOTP();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async () => {
    try {
      const payload = {
        pin_uid: pinUid,
        otp,
      };

      if (method === "email") {
        await validateEmailOTP.mutateAsync(payload);
      } else {
        await validateMobileOTP.mutateAsync(payload);
      }
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
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">Vérification du code</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 items-center"
      >
        <p className="text-sm text-muted-foreground">
          Saisissez le code à 6 chiffres envoyé à votre{" "}
          {method === "email" ? "email" : "téléphone"}
        </p>

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

        <div className="text-center text-sm text-muted-foreground">
          {timeLeft > 0 ? (
            <p>Le code expire dans {formatTime(timeLeft)}</p>
          ) : (
            <p className="text-destructive">Le code a expiré</p>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={
            otp.length !== 6 ||
            timeLeft <= 0 ||
            validateEmailOTP.isPending ||
            validateMobileOTP.isPending
          }
        >
          {validateEmailOTP.isPending || validateMobileOTP.isPending
            ? "Vérification..."
            : "Vérifier"}
        </Button>
      </motion.div>
    </div>
  );
}
