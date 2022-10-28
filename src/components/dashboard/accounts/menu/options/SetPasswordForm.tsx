import { useForm, SubmitHandler } from 'react-hook-form';

import { Card, CardContent, TextField, Button } from '@mui/material';

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function SetPasswordForm() {
  const { register } = useForm<FormValues>();
  return <></>;
}
