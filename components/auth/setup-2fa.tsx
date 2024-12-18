"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { AuthStep, CheckUserResponse } from "@/lib/api/types";
import { Skeleton } from "../ui/skeleton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useValidateGoogleOTP } from "@/hooks/api/use-auth";
import { useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "@/lib/constants";

export function Setup2FA({
  requestOTPResponse,
  setStep,
}: {
  requestOTPResponse: CheckUserResponse;
  setStep: (step: AuthStep) => void;
}) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const { mutate: validateGoogleOTP, isPending: isValidating } =
    useValidateGoogleOTP();

  const handleValidate = async () => {
    validateGoogleOTP(
      { email: requestOTPResponse.email, otp },
      {
        onSuccess: () => {
          router.push(PROTECTED_ROUTES.DASHBOARD.url);
        },
      }
    );
  };

  return (
    <motion.div
      key="setup-2fa"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep("request")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            Configuration de la double authentification
          </h2>
        </div>
        <Alert>
          <AlertDescription>
            Pour finaliser la création de votre compte veuillez configurer la
            double authentification avec Google Authenticator en suivant ces
            étapes:
            <ol className="list-decimal ml-4 mt-2 space-y-2">
              <li>Téléchargez Google Authenticator sur votre téléphone</li>
              <li>Scannez le QR code ci-dessous avec l&apos;application</li>
              <li>Entrez le code à 6 chiffres généré pour continuer</li>
            </ol>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-center">
        <div className="rounded-lg">
          {requestOTPResponse.qr_code ? (
            <Image
              src={requestOTPResponse.qr_code}
              alt="QR Code pour Google Authenticator"
              width={100}
              height={100}
              className="mx-auto"
            />
          ) : (
            <Skeleton className="w-32 h-32" />
          )}
        </div>
      </div>

      <div className="space-y-4 flex flex-col items-center justify-center">
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
          disabled={otp.length !== 6 || isValidating}
          className="w-full"
          onClick={handleValidate}
        >
          Vérifier
        </Button>
      </div>
    </motion.div>
  );
}
