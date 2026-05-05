import { Flex, Text, Input, Textarea, Field } from "@chakra-ui/react";
import { Button } from "./button";
import { toaster } from "../../toaster";

import { useDimensions } from "../../dimensions";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function SendEmail() {
  const { height } = useDimensions();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return false;

    const token = await executeRecaptcha("send_email");
    const response = await fetch("/api/recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data?.success && data.score > 0.5;
  }, [executeRecaptcha]);

  const onSubmit = async (values) => {
    const isHuman = await handleReCaptchaVerify();

    if (!isHuman) {
      toaster.create({
        title: "Email not sent.",
        description: "reCAPTCHA check failed. Please try again.",
        type: "error",
        duration: 9000,
      });
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toaster.create({
        title: "Email sent.",
        description: "Your email has been sent.",
        type: "success",
        duration: 9000,
      });
      reset();
    } else {
      toaster.create({
        title: "Email not sent.",
        description: "Something went wrong. Please try again.",
        type: "error",
        duration: 9000,
      });
    }
  };

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field.Root invalid={!!errors.email}>
          <Input
            h={`${height}vh`}
            borderRadius={0}
            border={0}
            borderTopWidth="1px"
            borderTopColor="stroke"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <Field.ErrorText pl={4} pb={1}>
            {errors.email?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.subject}>
          <Input
            h={`${height}vh`}
            borderRadius={0}
            border={0}
            borderTopWidth="1px"
            borderTopColor="stroke"
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
          />
          <Field.ErrorText pl={4} pb={1}>
            {errors.subject?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.message}>
          <Textarea
            h={`${height * 2}vh`}
            resize={"none"}
            borderRadius={0}
            border={0}
            borderTopWidth="1px"
            borderTopColor="stroke"
            placeholder="Message"
            {...register("message", { required: "Message is required" })}
          />
          <Field.ErrorText pl={4} pb={1}>
            {errors.message?.message}
          </Field.ErrorText>
        </Field.Root>

        <button type="submit" disabled={isSubmitting} style={{ width: "100%" }}>
          <Flex
            role="group"
            borderTopWidth="1px"
            borderTopColor="stroke"
            borderBottomWidth="1px"
            borderBottomColor="stroke"
            w="full"
            h={`${height}vh`}
            alignItems="center"
            justifyContent="center"
            fontWeight="600"
            fontSize={["md", "lg", "xl"]}
            cursor={isSubmitting ? "not-allowed" : "pointer"}
            bg="transparent"
            color="fgInverse"
            opacity={isSubmitting ? 0.5 : 1}
            transition="background 0.25s ease, color 0.25s ease"
            _hover={isSubmitting ? {} : { bg: "fgInverse", color: "bgInverse" }}
          >
            Send
          </Flex>
        </button>
      </form>
    </Flex>
  );
}

export default SendEmail;
