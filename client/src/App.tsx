import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import "./App.css";

export const App = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};
