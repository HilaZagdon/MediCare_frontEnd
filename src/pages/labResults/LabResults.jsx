import React, { useState, useEffect } from 'react';
import LabCard from '../../components/labCard/LabCard';
import "./LabResults.css"

function LabResults({ userId }) {
  const [labResults, setLabResults] = useState([]);

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/testResults/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch lab results');
        }
        const data = await response.json();

        const sortedResults = data.testResults.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLabResults(sortedResults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLabResults();
  }, [userId]);

  const getMinMaxRange = (testName) => {
    switch (testName) {
        case 'CRP':
        return { minRange: 0, maxRange: 5 };
        case 'Cholecterol':
        return { minRange: 120, maxRange: 200 };
        case 'Glucose':
        return { minRange: 70, maxRange: 100 };
        case 'Iron':
        return { minRange: 50, maxRange: 170 };
        case 'Transferrin':
        return { minRange: 200, maxRange: 380 };
        case 'Triglycerides':
        return { minRange: 35, maxRange: 170 };
        case 'TSH':
        return { minRange: 0.35, maxRange: 4.94 };
        case 'Ferritin':
        return { minRange: 10, maxRange: 300 };
        case 'Folic Acid':
        return { minRange: 3.1, maxRange: 20.5 };
        case 'Vitamin B12':
        return { minRange: 187, maxRange: 1060 };
        case 'WBC':
        return { minRange: 4, maxRange: 10 };
        case 'Lymphocytes':
        return { minRange: 1.1, maxRange: 3.5 };
        case 'RBC':
        return { minRange: 3.9, maxRange: 5.4 };
        case 'Hemoglobin':
        return { minRange: 12, maxRange: 16 };
        case 'Platelets':
        return { minRange: 150, maxRange: 400 };
      default:
        return { minRange: 0, maxRange: 100 };
    }
  };

  return (
    <div className="lab-results-container">
      <div className="lab-results">
        <h2>Lab Results</h2>
        <div className="lab-results-list">
          {labResults.map((result) => {
            const { _id, title, categories, date } = result;
            const testName = title;
            const testValues = categories.map(cat => ({
              name: cat.name,
              value: cat.value
            }));
            
            return (
              <LabCard
                key={_id}
                testName={testName}
                testValues={testValues}
                getMinMaxRange={getMinMaxRange}
                date={new Date(date).toLocaleDateString()} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LabResults;
