import React from 'react';
import { Formik } from 'formik';

type Errors = {
  email?: string;
  password?: string;
};

interface LogInFormProps {
  isLoading: boolean;
  errorMessage?: string;
  authenticate: (email: string, password: string) => Promise<any>;
}

const MIN_PASSWORD_LENGTH = 8;

export const LogInForm: React.FC<LogInFormProps> = ({
  isLoading,
  errorMessage,
  authenticate,
}) => (
  <div>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors: Errors = {};

        // Email validation
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        // Password validation
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < MIN_PASSWORD_LENGTH) {
          errors.password = 'Min 8 characters';
        }

        return errors;
      }}
      onSubmit={values => {
        authenticate(values.email, values.password);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          {!!errorMessage && <div>{errorMessage}</div>}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);
