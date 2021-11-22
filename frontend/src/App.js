import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const getReadings = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log('apiUrl', apiUrl);
      const route = `${apiUrl}/readings`;
      const response = await axios.get(route);
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
