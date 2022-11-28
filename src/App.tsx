import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import {
  AddTest,
  Category,
  FullTest,
  Home,
  Login,
  Registration,
  Tests,
  UserInfo,
} from "./pages";
import { useAppDispatch } from "./redux/hooks";
import { fethAuthMe } from "./redux/slices/auth/auth";

function App() {
  const dipatch = useAppDispatch();

  useEffect(() => {
    dipatch(fethAuthMe());
  }, []);

  return (
    <Container>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Tests />} />
        <Route path="/add-test" element={<AddTest />} />
        <Route path="/tests/:id" element={<FullTest />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/user/:id" element={<UserInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
}

export default App;
