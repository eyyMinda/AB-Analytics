import MainNav from "./MainNav";
import css from "./styles/Layout.module.css";

export default function Layout(props) {
  return (
    <div>
      <MainNav />

      <main className={css.main}>{props.children}</main>
    </div>
  );
}
