import './App.css';
import { useState } from 'react';

const baseUrl = 'http://localhost:4000';

function App() {
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();

  return (
    <div className="wholePageContainer">
      <div className="sidebar container">
        <h1>Names</h1>
        <div className="guestname container">
          <div>Nicholas Hämmerle</div>
          <button>Delete</button>
          <input type="checkbox" />
        </div>
      </div>

      <div className="input container">
        <h1>Add someone to your Guestlist</h1>
        <input name="" id="" placeholder="Vorname" />
        <input name="" id="" placeholder="Nachname" />
      </div>
    </div>
  );
}

export default App;
