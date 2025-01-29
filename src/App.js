//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import patients from "./data/patients.json";

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
  /*const patient = {
    name: "John Doe",
    patientNumber: "123456",
    age: 35,
    sex: "Male",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150", // Replace with patient's image URL
  };*/
  //const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  /*// Fetch patient data from the JSON file
  useEffect(() => {
    fetch("/src/data/patients.json") // Use `/public/patients.json`
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error loading patient data:", error));
  }, []);*/

  // Handle dropdown selection
  const handleChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedPatientId(selectedId);
    setPatient(null);
    setLoading(true);

    try {
      // Dynamically import the JSON file
      const patientData = await import(`./data/${selectedId}.json`);
      setPatient(patientData);
    } catch (error) {
      console.error("Error loading patient data:", error);
    }

    setLoading(false);
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
          {/* Patient Selection Dropdown */}
          <select className="form-select mb-3" value={selectedPatientId} onChange={handleChange}>
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p.patientId} value={p.patientId}>
                {p.name.lastName}, {p.name.firstName}
              </option>
            ))}
          </select>

          {/* Show loading indicator */}
          {loading && <p className="text-center text-muted">Loading...</p>}

          {/* Show Patient Info Only If Selected */}
          {patient && (
            <>
              <div className="text-center">
                <img
                  src={`/${patient.image}`} // Ensure image path is correct
                  alt="Patient"
                  className="rounded-circle img-fluid mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <h4 className="text-center">{patient.infoSheet.name.firstName} {patient.infoSheet.name.lastName}</h4>
              <p className="text-center text-muted">Patient #: {patient.patientId}</p>
              <hr />
              <ul className="list-unstyled">
                <li><strong>Age:</strong> {patient.infoSheet.age}</li>
                <li><strong>Sex:</strong> {patient.infoSheet.sex}</li>
                <li><strong>Email:</strong> <a href={`mailto:${patient.infoSheet.email}`}>{patient.infoSheet.email}</a></li>
                <li><strong>Phone:</strong> {patient.infoSheet.cellNumber}</li>
                <li><strong>PhilHealth:</strong> {patient.infoSheet.philhealth ? "Yes" : "No"}</li>
              </ul>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2 className="mb-4">Patient Dashboard</h2>
          
          {/* Show buttons only if a patient is selected */}
          {patient ? (
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
          ) : (
            <p className="text-muted">Please select a patient to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
