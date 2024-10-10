"use client";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldInputProps, FormikProps } from "formik";
import { useAuthContext } from "@/Providers/auth";

type FormProps = {
  onClose: () => void;
};

type FormValues = {
  username: string;
  title: string;
};

// Userprofile form, using Formik for form validation and error handling
export default function UserProfileForm({ onClose }: FormProps) {
  const { localStorageValues, setLocalStorage } = useAuthContext();
  const defaultValues = { username: "", title: "" };
  const { username, title } = localStorageValues
    ? JSON.parse(localStorageValues)
    : defaultValues;

  return (
    <Formik
      initialValues={{ username, title }}
      onSubmit={(values, { setSubmitting }) => {
        setLocalStorage(JSON.stringify(values));
        setSubmitting(false);
        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={4}>
            <Field type="text" name="username">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={!!form.errors.username && form.touched.username}
                  isRequired
                >
                  <FormLabel>Username</FormLabel>
                  <Input {...field} maxLength={255} />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field type="text" name="title">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={!!form.errors.title && form.touched.title}
                  isRequired
                >
                  <FormLabel>Job Title</FormLabel>
                  <Input {...field} maxLength={255} />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              colorScheme="blue"
              mb={3}
              mt={5}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
