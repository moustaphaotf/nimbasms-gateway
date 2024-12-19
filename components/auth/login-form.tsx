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
import { PhoneInputField } from "@/components/ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function LoginForm() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [pinUid, setPinUid] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.reset({ email: "", phone: "" });
  }, [method, form]);

  const requestEmailOTP = useRequestEmailOTP();
  const requestMobileOTP = useRequestMobileOTP();

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (method === "email" && data.email) {
        const response = await requestEmailOTP.mutateAsync(data.email);
        setPinUid(response.pin_uid);
        setStep("verify");
      } else if (method === "phone" && data.phone) {
        const response = await requestMobileOTP.mutateAsync(data.phone);
        setPinUid(response.pin_uid);
        setStep("verify");
      }
    } catch (error) {
      console.error(error);
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <h2 className="text-lg">Entrez votre email pour vous connecter</h2>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exemple@mtn.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    requestEmailOTP.isPending || requestMobileOTP.isPending
                  }
                >
                  {requestEmailOTP.isPending || requestMobileOTP.isPending
                    ? "Envoi en cours..."
                    : "Recevoir le code"}
                </Button>
              </form>
            </Form>
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
