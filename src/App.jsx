import { Routes, Route } from "react-router-dom";
import { Login, Register, Dashboard } from "./pages";
import { Suspense, useContext } from "react";
import LoginContext from "./context/loginContext";
import { ProtectedRoute } from "./components";

function App() {
  const { isLogin } = useContext(LoginContext);

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute isLogin={isLogin} />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
