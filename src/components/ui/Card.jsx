import css from "./styles/Card.module.css";
export default function Card(props) {
  return <div className={css.card}>{props.children}</div>;
}
