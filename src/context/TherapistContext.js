import { createContext, useContext, useEffect, useState } from "react";

import therapistData from "../components/pages/therapists/TherapistData";

const TherapistContext = createContext(null);

export function TherapistProvider({ children }) {
  const [therapistJson, setTherapistJson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


  const handleSetTherapist = (id) => {
    const therapist = therapistData.find((therapist) => therapist.id == id);

    if (therapist) {
      setTherapistJson(therapist);
    }
  };

  const handleSetDate = (date) => {
    setDate(date);
  };

  const handleSetTime = (time) => {
    setTime(time);
  };

  const value = {
    therapistJson,
    date,
    setDate,
    handleSetTime,
    handleSetDate,
    setTime,
    time,
    handleSetTherapist,
  };

  return (
    <TherapistContext.Provider value={value}>
      {children}
    </TherapistContext.Provider>
  );
}

function useTherapistContext() {
  const context = useContext(TherapistContext);
  if (!context) {
    throw new Error(
      "useTherapistContex must be used within TherapistContextProvider"
    );
  }

  return context;
}

export default useTherapistContext;
