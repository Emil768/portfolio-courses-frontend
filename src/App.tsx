import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Category } from "./pages/Category/Category";
import { FullTest } from "./pages/FullTest";
import { Home } from "./pages/Home";
import { Tests } from "./pages/Tests";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/:id" element={<FullTest />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
}

export default App;
