import { useEffect, useState } from "react";
import AbList from "../../components/Abs/AbList";

function AllAbPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [absData, setAbsData] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(import.meta.env.VITE_DB_ABS_URL)
  //     .then(res => res.json())
  //     .then(data => {
  //       // object of objects to array of objects
  //       const absArray = Object.keys(data).map(key => ({
  //         id: key,
  //         ...data[key],
  //       }));

  //       setAbsData(absArray);
  //       setIsLoading(false);
  //     });
  // }, []);

  // setAbsData(absArray);
  // setIsLoading(false);

  return (
    <section>
      <h1>All A/B Tests</h1>
      {isLoading ? <p>Loading...</p> : <AbList abs={absData} />}
    </section>
  );
}

export default AllAbPage;
