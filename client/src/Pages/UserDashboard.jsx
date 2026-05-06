import { useEffect, useRef } from "react";
import InvestmentCard from '../Components/Investmentcards'
import UserLayout from "../Components/UserLayout";

const UserDashboard = () => {
  const investments = [
    {
      date: "2024-03-01",
      amount: 10000,
      interest: 5,
      tags: [
        {name:"Real Estate",tag:"realestate"}, {name:"Long Term",tag:"longterm"}
         ]
    },
    {
      date: "2024-02-15",
      amount: 5000,
      interest: 4.5,
      tags: [
        {name:"Stocks",tag:"stocks"}, {name:"Short Term",tag:"shortterm"}
         ]
    },
    {
      date: "2024-01-10",
      amount: 7500,
      interest: 6,
      tags: [
        {name:"Bonds",tag:"bonds"}, {name:"Medium Term",tag:"bonds"}
            ]
    }
  ];

  const handleProjectTagClick =()=>{
    
  }

  return (
    <>
    <UserLayout/>
    <div style={{ padding: "20px", textAlign: "center",top:"200px" }}>
      {/* <h2>User Dashboard</h2>
      {investments.map((investment, index) => (
        <InvestmentCard key={index} investment={investment} generateMonths={generateMonths} handleProjectTagClick={handleProjectTagClick}/>
      ))} */}
    </div>
    </>
  );
};

const generateMonths = (startDate) => {
  const start = new Date(startDate);
  const end = new Date();
  const months = [];

  while (start <= end) {
    months.push(start.toLocaleString("default", { month: "short", year: "numeric" }));
    start.setMonth(start.getMonth() + 1);
  }
  return months;
};



export default UserDashboard;
