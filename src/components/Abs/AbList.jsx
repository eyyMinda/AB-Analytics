import css from "./styles/AbList.module.css";
import AbItem from "./AbItem";

function AbList(props) {
  return (
    <ul className={css.list}>
      {props.abs.map(ab => {
        return (
          <AbItem
            key={ab.id}
            id={ab.id}
            image={ab.image}
            title={ab.title}
            address={ab.address}
            description={ab.description}
          />
        );
      })}
    </ul>
  );
}

export default AbList;
