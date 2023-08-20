import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { startSingIn, startGoogleSingIn } from "../../store/auth/thunks";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isAuth = useMemo(() => status === "checking", [status]);

  const onSubmit = (data) => {
    dispatch(startSingIn(data));
    reset();
  };

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@example.com"
              fullWidth
              {...register("email", { required: true })}
              error={errors?.email?.type === "required"}
              helperText={
                errors?.email?.type === "required"
                  ? "This field is required"
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Your password"
              fullWidth
              {...register("password", { required: true, minLength: 6 })}
              error={
                errors?.password?.type === "required" ||
                errors?.password?.type === "minLength"
              }
              helperText={
                errors?.password?.type === "required"
                  ? "This field is required"
                  : errors?.password?.type === "minLength"
                  ? "6 characters minimum"
                  : ""
              }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              {errorMessage === "Error - inicio de sesion" ? (
                <Alert severity="error">Email or password are incorrect!</Alert>
              ) : (
                <></>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                onClick={onGoogleSingIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction={"row"}
            justifyContent={"end"}
            sx={{ mt: 2, mb: 1 }}
          >
            <Typography>You dont have an account?</Typography>
            <Link
              component={RouterLink}
              color={"inherit"}
              to="/auth/register"
              sx={{ ml: 1 }}
            >
              Create one!
            </Link>
          </Grid>

          <Grid
            container
            direction={"row"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <Typography>Did you forget your password?</Typography>
            <Link
              component={RouterLink}
              color={"inherit"}
              to="/auth/restorePassword"
              sx={{ ml: 1 }}
            >
              Click here!
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
