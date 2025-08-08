'use client';

import { Input as AppInput } from 'antd';
import * as React from 'react';

import type { InputRef } from 'antd';

// Base props inferred from the source component
export type InputProps = React.ComponentProps<typeof AppInput>;
type PasswordProps = React.ComponentProps<typeof AppInput.Password>;
type TextAreaProps = React.ComponentProps<typeof AppInput.TextArea>;
type SearchProps = React.ComponentProps<typeof AppInput.Search>;

// Base wrapper (forward ref for compatibility)
const BaseInput = React.forwardRef<InputRef, InputProps>(function Input(props, ref) {
  return <AppInput ref={ref} {...props} />;
});

// Sub-wrappers (forward refs too, matching underlying elements)
const Password = React.forwardRef<InputRef, PasswordProps>(function Password(props, ref) {
  return <AppInput.Password ref={ref} {...props} />;
});

const TextArea = React.forwardRef<InputRef, TextAreaProps>(function TextArea(props, ref) {
  return <AppInput.TextArea ref={ref} {...props} />;
});

const Search = React.forwardRef<InputRef, SearchProps>(function Search(props, ref) {
  return <AppInput.Search ref={ref} {...props} />;
});

// Compose the compound type
export interface CompoundInput extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Password: React.ForwardRefExoticComponent<PasswordProps & React.RefAttributes<InputRef>>;
  TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<InputRef>>;
  Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<InputRef>>;
}

// Attach statics so consumers can do Input.Password, etc.
export const Input: CompoundInput = Object.assign(BaseInput, { Password, TextArea, Search });
