import './App.css';
import { useState } from 'react';
import Attending from './Attending';
import NameList from './NameList';

const baseUrl = 'http://localhost:4000';

function App() {
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: name.firstName,
        lastName: name.lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setName({
      firstName: '',
      lastName: '',
    });
  }

  return (
    <div className="wholePageContainer">
      <NameList />
      <div className="input container">
        <h1>Add someone to your Guestlist</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              placeholder="Vorname"
              name="firstName"
              value={name.firstName}
              onChange={(e) => {
                setName({ ...name, firstName: e.target.value });
              }}
            />
          </label>
          <label>
            Last name
            <input
              placeholder="Nachname"
              name="lastName"
              value={name.lastName}
              onChange={(e) => {
                setName({ ...name, lastName: e.target.value });
              }}
            />
          </label>
          <button>Add new guest</button>
        </form>
      </div>
      <Attending />
    </div>
  );
}
export default App;
