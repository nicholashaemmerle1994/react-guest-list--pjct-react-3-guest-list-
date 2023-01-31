import './App.css';

export default function Attending(props) {
  const attending = props.guestList.filter((at) => {
    return at.attending === true;
  });
  const nonAttending = props.guestList.filter((nA) => {
    return nA.attending === false;
  });
  // className="sidebar container"

  // className="guestname container attending"
  return (
    <div className="sidebar container">
      <h1>Attending</h1>
      <div className="filterContainer">
        <div className="guestname  sidebar">
          <ul className="ulLi">
            {attending.map((attendingGuest) => {
              return (
                <li className="listElemnts coming" key={attendingGuest.id}>
                  {attendingGuest.firstName} {attendingGuest.lastName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className=" guestname  sidebar">
          <ul className="ulLi">
            {nonAttending.map((nonAttendingGuest) => {
              return (
                <li className="listElemnts" key={nonAttendingGuest.id}>
                  {nonAttendingGuest.firstName} {nonAttendingGuest.lastName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
