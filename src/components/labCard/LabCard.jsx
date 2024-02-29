import React from "react";
import { Link } from "react-router-dom";
import "./LabCard.css";

function LabCard({ testName, testValues, getMinMaxRange, date }) {
  return (
    <div className="lab-card">
      <h3>{testName}</h3>
      <p>{date}</p>
      {testValues.map((test) => {
        const { name, value } = test;
        const { minRange, maxRange } = getMinMaxRange(name);
        const percentage = ((value - minRange) / (maxRange - minRange)) * 100;
        const isOffScale = value < minRange || value > maxRange;

        let indicatorPosition = percentage;
        if (isOffScale) {
          indicatorPosition = value < minRange ? 0 : 100;
        }

        return (
          <div key={name} className="test-value">
            <Link to={`/graph/${name}`} className="test-name">
              {name}
            </Link>
            <div className="scale">
              <div
                className={`indicator ${isOffScale ? "off-scale" : ""}`}
                style={{ left: `${indicatorPosition}%` }}
              />
              <div className={`value ${isOffScale ? "off-scale" : ""}`} style={{ left: `${indicatorPosition}%` }}>
                {value}
              </div>
            </div>
            <div className="labelsMinMax">
              <span className="min-label">{minRange}</span>
              <span className="max-label">{maxRange}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LabCard;
