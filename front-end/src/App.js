import { Route, Routes } from "react-router";
import "./App.css";
import ContactList from "./components/ContactList";
import Update from "./components/Update";
import ViewContact from "./components/ViewContact";

function App() {
  return (
    <div className="App w-full h-screen ">
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="contact/edit/:contactid" element={<Update />} />
        <Route path="contact/view/:contactid" element={<ViewContact />} />
      </Routes>
    </div>
  );
}

export default App;
