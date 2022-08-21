import { Box } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangePasswordForm } from '../components/settings';

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

export default function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {};

  return <></>;
}
