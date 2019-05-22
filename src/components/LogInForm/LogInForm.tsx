import React from 'react';
import { Formik } from 'formik';
import { TextInput } from '../TextInput/TextInput';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { ButtonPrimary } from '../Buttton/Button';
import { Space } from '../Space/Space';
import { applyElevationCss } from '../../styles/applyElevation';

type Errors = {
  email?: string;
  password?: string;
};

interface LogInFormProps {
  isLoading: boolean;
  errorMessage?: string;
  authenticate: (email: string, password: string) => any;
}

const MIN_PASSWORD_LENGTH = 8;

const ErrorMessage = styled.div`
  padding: ${themeGet('spaces.1')}em;
  background-color: ${themeGet('loginForm.errorMessage.bgColor')};
  color: ${themeGet('loginForm.errorMessage.color')};
  border-radius: ${themeGet('loginForm.errorMessage.borderRadius')}em;
`;

const TextInputs = styled.div`
  ${applyElevationCss(1)};
  border-radius: ${themeGet('textInput.borderRadius')}em;

  > ${TextInput} {
    box-shadow: none;
  }

  > ${TextInput}:first-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  > ${TextInput}:last-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const Form = styled.form`
  font-size: ${themeGet('fontSizes.1')}rem;
`;

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
        isValid,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <TextInputs>
            <TextInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <TextInput
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </TextInputs>
          <Space value={4} />
          {errors.email && touched.email &&
            <React.Fragment>
              <ErrorMessage>Email: {errors.email}</ErrorMessage>
              <Space value={2} />
            </React.Fragment>
          }
          {errors.password && touched.password &&
            <React.Fragment>
              <ErrorMessage>Password: {errors.password}</ErrorMessage>
              <Space value={2} />
            </React.Fragment>
          }
          {!!errorMessage &&
            <React.Fragment>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              <Space value={2} />
            </React.Fragment>
          }
          <ButtonPrimary type="submit" disabled={isLoading || !isValid}>
            {isLoading &&
              <React.Fragment>
                <i className="fas fa-circle-notch fa-spin"/>
                {' '}
              </React.Fragment>
            }
            Log in
          </ButtonPrimary>
          <Space value={12} />
        </Form>
      )}
    </Formik>
  </div>
);
