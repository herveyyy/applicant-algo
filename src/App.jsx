import React, { useState, useEffect } from "react";
import studentsData from "./data/studentdata.js";
import regionScholars from "./data/regionScholars.js";

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [inputSlots, setInputSlots] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [regionSelectedData, setRegionSelectedData] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const passingScore = 86;

  useEffect(() => {
    const fetchRegionScholarsData = () => {
      setRegionSelectedData(regionScholars[selectedRegion]);
      setTotalApplicants(regionScholars[selectedRegion].studentID.length);
    };
    fetchRegionScholarsData();
  }, [selectedRegion]);
  const handleAddSlotsRegion = () => {
    const x = Number(inputSlots);
    console.log("Allocated slots:", x);
    console.log("Available applicants:", totalApplicants);
    if (x > 0) {
      applicantPass(x);
    } else {
      console.log("No slots allocated. Cannot process applicants.");
    }
  };
  
  const applicantPass = (num) => {
    const numToProcess = Math.min(num, totalApplicants);
  
    console.log("Allocated slots:", numToProcess);
  
    const studentIDs = regionSelectedData.studentID;
    //dani diay ka mag query
    const selectedStudents = studentIDs.map((id) => {
      return studentsData.find((student) => student.id === id); 
    });

    // Process only numToProcess applicants
    const passedApplicants = selectedStudents.slice(0, numToProcess).filter((student) => {
      return student.points >= passingScore;
    });
  
    console.log("Passed Applicants:", passedApplicants);
  };
  return (
    <div>
      <div className=''>
        <p className="text-2xl">
        Specific Region
          </p>
        <div>
          Select Region:
      <select className="w-24" onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion}>
     <option value={0}> Region 1</option>
     <option value={1}> Region 2</option>
     <option value={2}> Region 3</option>
     <option value={3}> Region 4</option>
     <option value={4}> Region 5</option>
     <option value={5}> Region 6</option>
     <option value={6}> Region 7</option>
      </select>
      </div>
      <div className="flex mt-2">
        <h1>Slots: </h1>
        <input
          onChange={(e) => setInputSlots(e.target.value)}
          type="number"
          className="border mx-2"
          value={inputSlots}
        />
        <p className=""> total applicants: {totalApplicants}</p>
      </div>
      <button
        className="bg-green-600 p-2 rounded-lg "
        onClick={handleAddSlotsRegion}
      >
        Add
      </button>
      </div>
    </div>
  );
}
