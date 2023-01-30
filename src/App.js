import './App.css';
import { useEffect, useState } from 'react';
import Attending from './Attending';

const baseUrl =
  'https://express-guest-list-api-memory-data-store.nicholashaemmer.repl.co';
function App() {
  const [guestApi, setGuestApi] = useState([]);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [fuckingUpdate, setFuckingUpdate] = useState(true);
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
    attending: false,
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
  //  Trying to fetch a single guest

  // async function fetchNewestGuest(id) {
  //   const response = await fetch(`${baseUrl}/guests/:id`);
  //   const guest = await response.json();
  // }

  //  Creating a new guest
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
  // Updating a guest
  async function updateGuest(checked, guestId) {
    await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attending: checked }),
    });
    setFuckingUpdate(!fuckingUpdate);
  }
  return (
    <div className="wholePageContainer">
      <div className="sidebar container">
        <h1>Names</h1>
        {/* mapping over the array, to create div, input and button to every new Guest */}
        {guestApi.map((guest) => {
          return (
            <div key={guest.id}>
              <div data-test-id="guest">
                {guest.firstName} {guest.lastName}
                <input
                  type="checkbox"
                  aria-label="attending"
                  checked={guest.attending}
                  onChange={(event) =>
                    updateGuest(event.currentTarget.checked, guest.id)
                  }
                />
                <button
                  aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                  onClick={() => deletGuest(guest.id)}
                >
                  Remove
                </button>
              </div>
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
