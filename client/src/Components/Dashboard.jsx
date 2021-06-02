import React from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  let user = location.state;

  console.log(user);

  return <div>Dashboard</div>;
}
