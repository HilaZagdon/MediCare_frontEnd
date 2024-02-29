import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Graph from "../../components/graph/Graph";

function GraphPage({ userId }) {
  const { testName } = useParams();
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/testResults/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test data");
        }
        const data = await response.json();
        if (Array.isArray(data.testResults)) {
          setTestData(data.testResults);
        } else {
          throw new Error("Fetched data testResults is not an array");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestData();
  }, [testName, userId]);

  return (
    <div className="graph-page">
      <h2>{testName} Test Results</h2>
      <div className="graph-container">
        <Graph data={testData} testName={testName} />
      </div>
    </div>
  );
}

export default GraphPage;