import { useNavigate } from "react-router-dom";
import NewAbForm from "../../components/Abs/NewAbForm";

function NewAbPage() {
  const navigate = useNavigate();

  function handleAbData(data) {
    console.log(data);
    // fetch(import.meta.env.VITE_DB_ABS_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(() => {
    //   navigate('/');
    // });
  }

  return (
    <section>
      <h1>Add New A/B test</h1>

      <NewAbForm onAddAb={handleAbData} />
    </section>
  );
}

export default NewAbPage;
