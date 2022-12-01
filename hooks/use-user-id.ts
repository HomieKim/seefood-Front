import React, { useState, useEffect } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState<number>(-1);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(parseInt(id));
    }
  }, []);
  return { userId };
};

export default useUserId;
