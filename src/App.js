import './App.css';
import { useEffect, useState } from 'react';
import Attending from './Attending';

// import NameList from './NameList';

const baseUrl = 'http://localhost:4000';
function App() {
  const [guestApi, setGuestApi] = useState([]);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [fuckingUpdate, setFuckingUpdate] = useState(true);
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
    attending: false,
    // attending: false,
  });
  //  Fetching from the API (on first rednder AND everytime the variable "name" gets updated)
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuestApi(allGuests);
      setIsLoading(false);
      setDisable(false);
    }
    fetchGuests().catch((error) => console.log(error));
  }, [fuckingUpdate]);

  if (isLoading) {
    return 'Loading...';
  }

  //  Deletning Function
  async function deletGuest() {
    await fetch(`${baseUrl}/guests/${guestApi[0]['id']}`, {
      method: 'DELETE',
    });
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuestApi(allGuests);
    setFuckingUpdate(!fuckingUpdate);
  }
  //  The function which sends the new guest to the API
  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: name.firstName,
        lastName: name.lastName,
        attending: name.attending,
      }),
    });
    setFuckingUpdate(!fuckingUpdate);

    setName({
      firstName: '',
      lastName: '',
    });
  }

  async function guestUpdate(checked, id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attending: checked }),
    });
  }
  return (
    <div className="wholePageContainer">
      <div className="sidebar container">
        <h1>Names</h1>
        {/* mapping over the array, to create div, input and button to every new Guest */}
        {guestApi.map((guest) => {
          return (
            <div key={guest.id} className="guestname container">
              <div data-test-id="guest">
                {guest.firstName} {guest.lastName}
              </div>
              <input
                type="checkbox"
                aria-label={`${guest.firstName} ${guest.lastName} attending:${guest.attending}`}
                checked={guest.attending}
                onChange={(event) =>
                  guestUpdate(event.currentTarget.checked, guest.id)
                }
                onClick={() => setFuckingUpdate(!fuckingUpdate)}
              />
              <button
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={deletGuest}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="input container">
        <h1>Add someone to your Guestlist</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              disabled={disable}
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
              disabled={disable}
              placeholder="Nachname"
              name="lastName"
              value={name.lastName}
              onChange={(e) => {
                setFuckingUpdate(!fuckingUpdate);
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
