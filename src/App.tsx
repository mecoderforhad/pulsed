import Routes from "./routes";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
