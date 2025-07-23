import * as yup from "yup";

// validation with yup library

const usersValidations = (id) => {
  let validationSchema;
  if (id) {
    validationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
      phone: yup
        .string()
        .typeError("That doesn't look like a phone number")
        .matches(/^\d+$/, "A phone number can only contain digits")
        .min(4, "A phone number must have at least 4 characters")
        .max(17, "A phone number can have at most 17 characters")
        .required("A phone number is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
    });
  } else {
    validationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
      phone: yup
        .string()
        .typeError("That doesn't look like a phone number")
        .matches(/^\d+$/, "A phone number can only contain digits")
        .min(4, "A phone number must have at least 4 characters")
        .max(17, "A phone number can have at most 17 characters")
        .required("A phone number is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

  return validationSchema;
};

export { usersValidations };
