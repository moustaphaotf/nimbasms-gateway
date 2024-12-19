"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { CheckUserResponse } from "@/lib/api/types";
import { Skeleton } from "../ui/skeleton";
import { LoginStep } from "./login-form";

export function Setup2FA({
  requestOTPResponse,
  setStep,
}: {
  requestOTPResponse: CheckUserResponse;
  setStep: (step: LoginStep) => void;
}) {
  return (
    <motion.div
      key="setup-2fa"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Configuration de la double authentification
        </h2>
        <Alert>
          <AlertDescription>
            Pour sécuriser votre compte, nous utilisons Google Authenticator.
            Suivez ces étapes :
            <ol className="list-decimal ml-4 mt-2 space-y-2 text-start">
              <li>Téléchargez Google Authenticator sur votre téléphone</li>
              <li>Scannez le QR code ci-dessous avec l&apos;application</li>
              <li>Entrez le code à 6 chiffres généré pour continuer</li>
            </ol>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg">
          {/* <Image
            src={`data:image/png;base64,${requestOTPResponse.qr_code}`}
            alt="QR Code pour Google Authenticator"
            width={200}
            height={200}
            className="mx-auto"
          /> */}
          <Skeleton className="w-32 h-32" />
        </div>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Entrez le code à 6 chiffres"
          maxLength={6}
          className="text-center text-2xl tracking-wider"
        />
        <Button className="w-full" onClick={() => setStep("verify")}>
          Vérifier
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setStep("request")}
        >
          Retour
        </Button>
      </div>
    </motion.div>
  );
}
