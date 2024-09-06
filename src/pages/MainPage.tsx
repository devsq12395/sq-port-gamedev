import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Header from "../components/Header";

import FrontSection from "../sections/FrontSection";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      
      <FrontSection />
    </>
  );
}

export default MainPage;
