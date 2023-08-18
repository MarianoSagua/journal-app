import { Navigate, Route, Routes } from "react-router-dom";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AuthRoutes } from "../auth/routes";
import { CheckingAuth } from "../ui";
import { useSelector } from "react-redux";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);

  useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "auth" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
