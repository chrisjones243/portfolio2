import {
  Flex,
  Text,
  Input,
  Textarea,
  useTheme,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { Button } from "./button";
import { RightArrow } from "./icons";

import { useDimensions } from "../../dimensions";
import { Formik, Form, Field } from "formik";
import { useCallback } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

function SendEmail() {
  // const [isHuman, setIsHuman] = useState(false);
  const toast = useToast();
  const { height } = useDimensions();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const theme = useTheme();
  const strokeColor = theme.colors.stroke;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("send_email");

    // Send the token to the api for verification
    const response = await axios({
      method: "post",
      url: "/api/recaptcha",
      data: {
        token,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.success && response.data.score > 0.5) {
      return true;
    }
    return false;
  }, [executeRecaptcha]);

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!emailRegex.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validateSubject = (value) => {
    let error;
    if (!value) {
      error = "Subject is required";
    }
    return error;
  };

  const validateMessage = (value) => {
    let error;
    if (!value) {
      error = "Message is required";
    }
    return error;
  };

  const handleSendEmail = async (email, subject, message) => {
    if (!executeRecaptcha) {
      console.log("cant recaptcha");
    }

    const isHuman = await handleReCaptchaVerify();

    if (isHuman) {
      const sendEmail = await axios({
        method: "post",
        url: "/api/contact",
        data: {
          email: email.email,
          subject: email.subject,
          message: email.message,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      if (sendEmail.status === 200) {
        toast({
          title: "Email sent.",
          description: "Your email has been sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Email not sent.",
          description: "Your email has not been sent.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Email not sent.",
        description: "Your email has not been sent.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column">
      <Flex h={`${height}vh`} pl={10} alignItems={"center"}>
        <Text
          fontStyle={"italic"}
          fontWeight={"500"}
          fontSize={["md", "lg", "2xl", "4xl"]}
        >
          Send Email
        </Text>
      </Flex>
      <Formik
        initialValues={{ email: "", subject: "", message: "" }}
        onSubmit={(values, actions) => {
          handleSendEmail(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Field name="email" type="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input
                      h={`${height}vh`}
                      borderRadius={0}
                      border={0}
                      borderTop={`1px solid ${strokeColor}`}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="subject" type="text" validate={validateSubject}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.subject && form.touched.subject}
                  >
                    <Input
                      h={`${height}vh`}
                      borderRadius={0}
                      border={0}
                      borderTop={`1px solid ${strokeColor}`}
                      placeholder="Subject"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="message" type="text" validate={validateMessage}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.message && form.touched.message}
                  >
                    <Textarea
                      h={`${height * 2}vh`}
                      resize={"none"}
                      borderRadius={0}
                      border={0}
                      borderTop={`1px solid ${strokeColor}`}
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>
              <button
                type="submit"
                disabled={props.isSubmitting}
                style={{ width: "100%" }}
              >
                <Button
                  rightIcon={RightArrow}
                  borderBottom={`1px solid ${strokeColor}`}
                  type="submit"
                >
                  Send
                </Button>
              </button>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default SendEmail;
