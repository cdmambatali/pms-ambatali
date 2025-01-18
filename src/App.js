import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {
  const patient = {
    name: "John Doe",
    patientNumber: "123456",
    age: 35,
    sex: "Male",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150", // Replace with patient's image URL
  };

  const buttons = [
    { id: 1, icon: "1", label: "Information Sheet" },
    { id: 2, icon: "2", label: "Medical History" },
    { id: 3, icon: "3", label: "SOAP" },
    { id: 4, icon: "4", label: "Laboratory" },
    { id: 5, icon: "5", label: "Images/X-rays" },
    { id: 6, icon: "6", label: "Prescriptions" },
  ];

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-4">
          <div className="text-center">
            <img
              src={patient.image}
              alt="Patient"
              className="rounded-circle img-fluid mb-3"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <h4 className="text-center">{patient.name}</h4>
          <p className="text-center text-muted">Patient #: {patient.patientNumber}</p>
          <hr />
          <ul className="list-unstyled">
            <li>
              <strong>Age:</strong> {patient.age}
            </li>
            <li>
              <strong>Sex:</strong> {patient.sex}
            </li>
            <li>
              <strong>Email:</strong> <a href={`mailto:${patient.email}`}>{patient.email}</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2 className="mb-4">Patient Dashboard</h2>
          <div className="row g-3">
            {buttons.map((button) => (
              <div className="col-6 col-md-4 col-lg-3" key={button.id}>
                <button
                  className="btn btn-primary d-flex flex-column align-items-center justify-content-center w-100"
                  style={{ height: "100px" }}
                >
                  <span className="display-4">{button.icon}</span>
                  <span>{button.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
