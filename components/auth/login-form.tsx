"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequestEmailOTP, useRequestMobileOTP } from "@/hooks/api/use-auth";
import { OTPVerification } from "./otp-verification";
import { Phone, Mail } from "lucide-react";

export function LoginForm() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [identifier, setIdentifier] = useState("");
  const [pinUid, setPinUid] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");

  useEffect(() => {
    setIdentifier("");
  }, [method])

  const requestEmailOTP = useRequestEmailOTP();
  const requestMobileOTP = useRequestMobileOTP();

  const handleRequestOTP = async () => {
    try {
      if (method === "email") {
        const response = await requestEmailOTP.mutateAsync(identifier);
        setPinUid(response.pin_uid);
        setStep("verify");
      } else {
        const response = await requestMobileOTP.mutateAsync(identifier);
        setPinUid(response.pin_uid);
        setStep("verify");
      }
    } catch (error) {
      console.log(error)
      // Error is handled by the mutation
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {step === "request" ? (
          <motion.div
            key="request"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs
              defaultValue="email"
              className="w-full"
              onValueChange={(value) => setMethod(value as "email" | "phone")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone">
                  <Phone className="mr-2 h-4 w-4" />
                  Téléphone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@mtn.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+224 XXX XX XX XX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </TabsContent>

              <Button
                className="w-full mt-4"
                onClick={handleRequestOTP}
                disabled={!identifier || requestEmailOTP.isPending || requestMobileOTP.isPending}
              >
                {requestEmailOTP.isPending || requestMobileOTP.isPending
                  ? "Envoi en cours..."
                  : "Recevoir le code"}
              </Button>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <OTPVerification
              pinUid={pinUid}
              method={method}
              onBack={() => setStep("request")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}