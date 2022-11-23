import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Category, FullTest, Home, Login, Registration, Tests } from "./pages";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/:id" element={<FullTest />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
}

export default App;
