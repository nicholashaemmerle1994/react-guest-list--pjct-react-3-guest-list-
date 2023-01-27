import './App.css';

const baseUrl = 'http://localhost:4000';

export default function NameList() {
  async function fullNameList() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    return allGuests;
  }

  return (
    <div className="sidebar container">
      <h1>Names</h1>
      <div className="guestname container">
        <div>Nicholas Hämmerle</div>
        <input type="checkbox" />
        <button>Delete</button>
      </div>
    </div>
  );
}
