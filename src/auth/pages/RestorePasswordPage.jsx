import { useForm } from "react-hook-form";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { startRestorePassword } from "../../store/auth/thunks";
import { logout } from "../../store/auth/authSlice";

export const RestorePasswordPage = () => {
  const { status, errorMessage } = useSelector((status) => status.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isAuth = useMemo(() => status === "checking", [status]);

  const onSubmit = (data) => {
    dispatch(startRestorePassword(data));
  };

  const onResetRestore = () => {
    reset();
  };

  return (
    <AuthLayout title="Restore Password">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit(onSubmit)}
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

          <Typography sx={{ mb: 5, mt: 1, textAlign: "start", opacity: 0.7 }}>
            We will send you an email to restore you password.
          </Typography>

          <Grid item xs={12}>
            {errorMessage === "Error - restore password" ? (
              <Alert sx={{ mb: 2, mt: 1 }} severity="error">
                No account matches the email entered.{" "}
                <span onClick={onResetRestore}>Try Again!</span>
              </Alert>
            ) : (
              <></>
            )}

            {status === "restoring password" ? (
              <Alert sx={{ mb: 2, mt: 1 }} severity="success">
                Email send to Check It!
              </Alert>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={isAuth}
              type="submit"
              variant="contained"
              fullWidth
            >
              Send
            </Button>
          </Grid>

          <Grid
            container
            sx={{ mt: 2 }}
            direction={"row"}
            justifyContent={"end"}
            onClick={() => dispatch(logout())}
          >
            <Link component={RouterLink} color={"inherit"} to="/auth/login">
              Back to Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
