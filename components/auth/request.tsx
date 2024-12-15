import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/schemas/login.schema";
import { useEffect } from "react";
import { CheckUserResponse } from "@/lib/api/types";
import { LoginStep } from "./login-form";
import { useRequestGoogleOTP } from "@/hooks/api/use-auth";

export function RequestOTP({
  setRequestOTPResponse,
  setStep,
}: {
  setRequestOTPResponse: (response: CheckUserResponse) => void;
  setStep: (step: LoginStep) => void;
}) {
  const requestEmailOTP = useRequestGoogleOTP();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await requestEmailOTP.mutateAsync(data.email);
      setRequestOTPResponse(response);

      if (response.is_new_user) {
        setStep("setup-2fa");
      } else {
        setStep("verify");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.reset({ email: "" });
  }, [form]);

  return (
    <motion.div
      key="request"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
            disabled={requestEmailOTP.isPending}
          >
            {requestEmailOTP.isPending
              ? "Connexion en cours..."
              : "Se connecter"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
