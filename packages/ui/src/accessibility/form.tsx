'use client';

import React, { createContext, useContext, useId } from 'react';

interface FormFieldContextValue {
  id: string;
  errorId: string;
  descriptionId: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within an AccessibleFormField');
  }
  return context;
}

export interface AccessibleFormFieldProps {
  id?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * Accessible form field context provider linking inputs, labels, descriptions, and error messages.
 *
 * Implements:
 * - WCAG 2.1 SC 1.3.1 (Info and Relationships)
 * - WCAG 2.1 SC 3.3.1 (Error Identification)
 * - WCAG 2.1 SC 3.3.2 (Labels or Instructions)
 */
export function AccessibleFormField({
  id: customId,
  required,
  invalid,
  disabled,
  children,
}: AccessibleFormFieldProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;
  const descriptionId = `${id}-desc`;

  return (
    <FormFieldContext.Provider value={{ id, errorId, descriptionId, required, invalid, disabled }}>
      <div>{children}</div>
    </FormFieldContext.Provider>
  );
}

export interface AccessibleLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function AccessibleLabel({ children, ...props }: AccessibleLabelProps) {
  const { id, required } = useFormField();

  return (
    <label htmlFor={id} {...props}>
      {children}
      {required && <span aria-hidden="true"> *</span>}
    </label>
  );
}

export interface AccessibleInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'required'
> {
  hasDescription?: boolean;
}

export function AccessibleInput({
  hasDescription,
  className = '',
  ...props
}: AccessibleInputProps) {
  const { id, errorId, descriptionId, required, invalid, disabled } = useFormField();

  const describedBy =
    [hasDescription ? descriptionId : null, invalid ? errorId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <input
      id={id}
      required={required}
      disabled={disabled}
      aria-required={required ? 'true' : undefined}
      aria-invalid={invalid ? 'true' : undefined}
      aria-describedby={describedBy}
      className={className}
      {...props}
    />
  );
}

export interface AccessibleTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id' | 'required'
> {
  hasDescription?: boolean;
}

export function AccessibleTextarea({
  hasDescription,
  className = '',
  ...props
}: AccessibleTextareaProps) {
  const { id, errorId, descriptionId, required, invalid, disabled } = useFormField();

  const describedBy =
    [hasDescription ? descriptionId : null, invalid ? errorId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <textarea
      id={id}
      required={required}
      disabled={disabled}
      aria-required={required ? 'true' : undefined}
      aria-invalid={invalid ? 'true' : undefined}
      aria-describedby={describedBy}
      className={className}
      {...props}
    />
  );
}

export interface AccessibleErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function AccessibleErrorMessage({
  children,
  className = '',
  ...props
}: AccessibleErrorMessageProps) {
  const { errorId, invalid } = useFormField();

  if (!invalid) {
    return null;
  }

  return (
    <p id={errorId} role="alert" aria-live="polite" className={className} {...props}>
      {children}
    </p>
  );
}

export interface AccessibleDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function AccessibleDescription({
  children,
  className = '',
  ...props
}: AccessibleDescriptionProps) {
  const { descriptionId } = useFormField();

  return (
    <p id={descriptionId} className={className} {...props}>
      {children}
    </p>
  );
}
