import css from "./styles/NewAbForm.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

function NewAbForm(props) {
  const inputs = {
    title: useRef(),
    // image: useRef(),
    description: useRef(),
  };

  function handleSubmit(e) {
    e.preventDefault();

    const abData = Object.fromEntries(
      Object.entries(inputs).map(([key, ref]) => [key, ref.current.value])
    );
    props.onAddAb(abData);
  }

  return (
    <Card>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.control}>
          <label htmlFor="title">A/B Title</label>
          <input type="text" required id="title" ref={inputs.title} />
        </div>

        {/* <div className={css.control}>
          <label htmlFor="image">A/B Image</label>
          <input type="url" required id="image" ref={inputs.image} />
        </div> */}

        <div className={css.control}>
          <label htmlFor="description">Ab Description</label>
          <textarea
            required
            id="description"
            rows="5"
            ref={inputs.description}
          />
        </div>

        <div className={css.actions}>
          <button>Add A/B Test</button>
        </div>
      </form>
    </Card>
  );
}

export default NewAbForm;
