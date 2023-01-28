import './App.css';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function NameList(props) {
  const [guestApi, setGuestApi] = useState([]);
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuestApi(allGuests);
    }
    fetchGuests().catch((error) => console.log(error));
  }, [props.isTrue]);

  // async function updateGuest() {
  //   await fetch(`${baseUrl}/guests/${guestApi[0]['attending']}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ attending: true }),
  //   });
  //   console.log(guestApi[0]['attending']);
  // }

  async function deletGuest() {
    await fetch(`${baseUrl}/guests/${guestApi[0]['id']}`, {
      method: 'DELETE',
    });
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuestApi(allGuests);
  }

  return (
    <div className="sidebar container">
      <h1>Names</h1>
      {guestApi.map((guest) => {
        return (
          <div key={guest.id} className="guestname container">
            <div data-test-id="guest">
              {guest.firstName} {guest.lastName}
            </div>
            <input type="checkbox" aria-label="" />
            <button onClick={deletGuest}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
