import AuthProvider from "./provider/authProvider";
import Routes from "./routes/Index";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
