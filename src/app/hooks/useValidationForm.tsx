import { FieldErrors } from "node_modules/react-hook-form/dist";
import { useState, useMemo } from "react";

type ValidationHookProps = {
  email: string | null;
  password: string | null;
}

enum Error {
  REQUIRED = 'required',
  MAX_LENGTH = 'minLength'
}

export const useValidationForm = ({ errors }: { errors: FieldErrors }) => {
  const emailError = useMemo(() => (errors.email && errors.email.type === Error.REQUIRED) ? "Email is required" : null, [errors.email]);
  const passwordError = useMemo(() => {
    if (errors.password) {
      if (errors.password.type === Error.REQUIRED) {
        return "Password is required"
      }

      if (errors.password.type === Error.MAX_LENGTH) {
        return "Min length must be 8 characters";
      }
    } else {
      return null;
    }
  }, [errors.password]);

  const nameError = useMemo(() => errors.name && errors.name.type === Error.REQUIRED ? 'Name is required' : null, [errors.name]);
  const surnameError = useMemo(() => errors.surname && errors.surname.type === Error.REQUIRED ? 'Surname is required' : null, [errors.surname]);
  const titleError = useMemo(() => errors.title && errors.title.type === Error.REQUIRED ? 'Title is required' : null, [errors.title]);
  const descriptionError = useMemo(() => errors.description && errors.description.type === Error.REQUIRED ? 'Title is required' : null, [errors.description]);
  const studentError = useMemo(() => errors.student && errors.student.type === Error.REQUIRED ? 'Student is required' : null, [errors.student]);
  const statusError = useMemo(() => errors.status && errors.status.type === Error.REQUIRED ? 'Status is required' : null, [errors.status]);
  const estimationError = useMemo(() => errors.estimation && errors.estimation.type === Error.REQUIRED ? 'Estimation is required' : null, [errors.estimation]);
  const priorityError = useMemo(() => errors.priority && errors.priority.type === Error.REQUIRED ? 'Priority is required' : null, [errors.priority]);
  const scopeNameError = useMemo(() => errors.scopeName && errors.scopeName.type === Error.REQUIRED ? 'Scope name is required' : null, [errors.scopeName]);

  return {
    emailError,
    passwordError,
    nameError,
    surnameError,
    titleError,
    descriptionError,
    studentError,
    statusError,
    estimationError,
    priorityError,
    scopeNameError
  }
}