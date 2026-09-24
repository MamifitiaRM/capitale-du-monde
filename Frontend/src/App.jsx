import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import {
  Account,
  Continent,
  Home,
  Leaderboard,
  Login,
  NotFound,
  Play,
  Signup,
} from "#page";
import useUserStore from "#store/useUserStore";
import useLevelStore from "#store/useLevelStore";
import { Footer } from "#components";

const App = () => {
  const { user, authentication, checkingAuth } = useUserStore();
  const { getLevels } = useLevelStore();

  useEffect(() => {
    authentication();
  }, [authentication]);

  const userId = user?._id;

  useEffect(() => {
    if (userId) getLevels();
  }, [userId, getLevels]);

  if (checkingAuth) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center gap-4"
        role="status"
      >
        <Loader className="animate-spin" size={40} />
        <span>Chargement...</span>
      </div>
    );
  }

  const protectedRoute = (element) =>
    user ? element : <Navigate to="/login" replace />;
  const publicRoute = (element) =>
    user ? <Navigate to="/" replace /> : element;

  return (
    <>
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={protectedRoute(<Home />)} />
          <Route path="/signup" element={publicRoute(<Signup />)} />
          <Route path="/login" element={publicRoute(<Login />)} />
          <Route
            path="/continent/:id"
            element={protectedRoute(<Continent />)}
          />
          <Route
            path="/play/:continent/:level"
            element={protectedRoute(<Play />)}
          />
          <Route path="/classement" element={protectedRoute(<Leaderboard />)} />
          <Route path="/account" element={protectedRoute(<Account />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position="top-center" />
      <Footer />
    </>
  );
};

export default App;
