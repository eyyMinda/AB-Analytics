import css from "./styles/AbItem.module.css";
import { useContext } from "react";

import AbContext from "../../setup/ab-context";
import Card from "../ui/Card";

function AbItem(props) {
  const abCtx = useContext(AbContext);
  const isActiveAb = abCtx.isActiveAb(props.id);

  function handleToggleAbStatus() {
    isActiveAb ? abCtx.removeAb(props.id) : abCtx.addAb(props);
  }

  return (
    <li className={css.item}>
      <Card>
        <div className={css.image}>
          <img src={props.image} alt={props.title} />
        </div>

        <div className={css.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>

        <div className={css.actions}>
          <button onClick={handleToggleAbStatus}>
            {isActiveAb ? "Disable Ab Test" : "Enable Ab Test"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default AbItem;
