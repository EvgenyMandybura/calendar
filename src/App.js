import "./App.css";
import { GoogleAuth } from "./components/auth";
import { CreateEvent } from "./components/createEvent";

function App() {
  return (
    <div className="App">
      <h1>Google Calendar Event Creator</h1>
      <GoogleAuth />
      <CreateEvent />
    </div>
  );
}

export default App;
