import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import "./App.css";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Router />
    </div>
  );
};
