import Routes from "./routes";
import AuthProvider from "./provider/AuthProvider";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <div className="App">
      <HeroUIProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </HeroUIProvider>
    </div>
  );
}

export default App;
