import { Button, TextField, Link, Grid, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { AuthWrapper } from '../components/AuthWrapper';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useValidationForm } from 'src/app/hooks/useValidationForm';
import { register, RegisterProps } from 'src/app/thunk/auth';
import { useDispatch } from 'react-redux';

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm();
  const { emailError, passwordError, nameError, surnameError } = useValidationForm({ errors });

  const handleRedirect = () => history.push('/')


  const onSubmit = (data: RegisterProps) => {
    dispatch(register(data));

    handleRedirect()
  };

  return (
    <AuthWrapper title="Sign Up">
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              as={TextField}
              name='name'
              autoFocus
              control={control}
              onChange={args => args[0].nativeEvent.text}
              label='First Name'
              defaultValue=""
              fullWidth
              error={!!nameError}
              rules={{ required: true }}
              helperText={nameError}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              as={TextField}
              name='surname'
              control={control}
              onChange={args => args[0].nativeEvent.text}
              label='Surname'
              defaultValue=""
              fullWidth
              error={!!surnameError}
              rules={{ required: true }}
              helperText={surnameError}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              name='email'
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="role" >Role</InputLabel>
              <Controller
                control={control}
                as={Select}
                name='role'
                onChange={args => args[0].nativeEvent.text}
                defaultValue="student"
                id="role"
                rules={{ required: true }}
              >
                <MenuItem value='student'>Student</MenuItem>
                <MenuItem value='leader'>Diploma Leader</MenuItem>
              </Controller>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={handleRedirect}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper >
  );
}