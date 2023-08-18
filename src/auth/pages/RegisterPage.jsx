import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";

export const RegisterPage = () => {
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(startCreatingUserWithEmailAndPassword(data));
    reset();
  };

  return (
    <AuthLayout title="Create Account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Your name"
              fullWidth
              {...register("displayName", { required: true, maxLength: 20 })}
              error={
                errors?.displayName?.type === "required" ||
                errors?.displayName?.type === "maxLength"
              }
              helperText={
                errors?.displayName?.type === "required"
                  ? "This field is required"
                  : errors?.displayName?.type === "maxLength"
                  ? "No more than 20 characters"
                  : ""
              }
            />
          </Grid>

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
              placeholder="Create a password"
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
              {errorMessage === "Error - registro" ? (
                <Alert severity="error">Email or password are incorrect!</Alert>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"}>
            <Typography>Do you already have an account?</Typography>
            <Link
              component={RouterLink}
              color={"inherit"}
              to="/auth/login"
              sx={{ ml: 1 }}
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
