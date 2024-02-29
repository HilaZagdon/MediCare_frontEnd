import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function LabDashboard() {
  const [userId, setUserId] = useState("");
  const [testResults, setTestResults] = useState([
    { testName: "", testResult: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Options for the test names
  const testNames = [
    "CRP",
    "Cholesterol",
    "Glucose",
    "Iron",
    "Transferrin",
    "Triglycerides",
    "TSH",
    "Ferritin",
    "Folic Acid",
    "Vitamin B12",
    "WBC",
    "Lymphocytes",
    "RBC",
    "Hemoglobin",
    "Platelets",
  ];

  const handleAddTestResult = () => {
    setTestResults([...testResults, { testName: "", testResult: "" }]);
  };

  const handleTestNameChange = (index, value) => {
    const newTestResults = [...testResults];
    newTestResults[index].testName = value;
    setTestResults(newTestResults);
  };

  const handleTestResultChange = (index, value) => {
    const newTestResults = [...testResults];
    newTestResults[index].testResult = value;
    setTestResults(newTestResults);
  };

  const handleRemoveTestResult = (index) => {
    const newTestResults = [...testResults];
    newTestResults.splice(index, 1);
    setTestResults(newTestResults);
  };


  const handleSubmit = async () => {
    try {
      const formattedTestResults = testResults.map(
        ({ testName, testResult }) => ({
          name: testName,
          value: Number(testResult),
        })
      );

      console.log({
        categories: formattedTestResults,
        title: "nvbnvhgvhg",
        patientID: userId,
      });
      const response = await fetch("http://localhost:3000/api/v1/testResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientID: userId,
          title: "nvbnvhgvhg",
          categories: formattedTestResults,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add test results");
      }

      setSuccessMessage("Test results submitted successfully");

      setUserId("");
      setTestResults([{ testName: "", testResult: "" }]);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lab Dashboard</h1>
      {successMessage && <div>{successMessage}</div>}
      <div>
        <label htmlFor="userId">Patient ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      {testResults.map((test, index) => (
        <div key={index}>
          <div>
            <Autocomplete
              disablePortal
              id={`testName${index}`}
              options={testNames}
              value={test.testName}
              onChange={(e, newValue) =>
                handleTestNameChange(index, newValue || "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Test" />
              )}
            />
          </div>
          <div>
            <label htmlFor={`testResult${index}`}>Test Result:</label>
            <input
              type="number"
              id={`testResult${index}`}
              value={test.testResult}
              onChange={(e) => handleTestResultChange(index, e.target.value)}
            />
          </div>
          {index > 0 && (
            <button onClick={() => handleRemoveTestResult(index)}>
              Remove Result
            </button>
          )}
        </div>
      ))}
      <button onClick={handleAddTestResult}>Add Another Result</button>
      <button onClick={handleSubmit}>Submit Test Results</button>
    </div>
  );
}

export default LabDashboard;