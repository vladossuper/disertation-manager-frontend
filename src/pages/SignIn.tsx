import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AuthWrapper } from '../components/AuthWrapper';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useValidationForm } from '../app/hooks/useValidationForm';
import { login, LoginProps } from '../app/thunk/auth';

export const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const { emailError, passwordError } = useValidationForm({ errors });
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginProps) => {
    dispatch(login(data));
  };

  const handleRedirect = () => history.push('/signup');

  return (
    <AuthWrapper title="Sign in">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name='email'
          autoFocus
          control={control}
          onChange={args => args[0].nativeEvent.text}
          label='Email Address'
          defaultValue=""
          fullWidth
          error={!!emailError}
          rules={{ required: true }}
          helperText={emailError}
          margin="normal"
        />

        <Controller
          as={TextField}
          name='password'
          control={control}
          onChange={args => args[0].nativeEvent.text}
          label='Password'
          defaultValue=""
          fullWidth
          type="password"
          error={!!passwordError}
          rules={{ required: true, minLength: 8 }}
          helperText={passwordError}
          margin="normal"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          {/* <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid> */}
          <Grid item>
            <Link variant="body2" onClick={handleRedirect}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
}
