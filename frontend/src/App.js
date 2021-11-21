import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const getReadings = async () => {
      const response = await axios.get("http://localhost:5150/readings");
      setReadings(response.data);
    };
    getReadings();
  }, []);

  return (
    <div>
      {readings.map((reading, i) => {
        return (
          <p key={i}>
            {reading.createdAt} - {reading.temperature}
          </p>
        );
      })}
    </div>
  );
};

export default App;
