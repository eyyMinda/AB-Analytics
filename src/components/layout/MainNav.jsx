import { useContext } from "react";
import { Link } from "react-router-dom";
import css from "./styles/MainNav.module.css";

import AbContext from "../../setup/ab-context";

function MainNav() {
  const absCtx = useContext(AbContext);

  return (
    <div className={css.header}>
      <h2 className={css.logo}>A/B Analytics</h2>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/all-abs">All A/B</Link>
        </li>
        <li>
          <Link to="/active-abs">
            Active A/B
            <span className={css.badge}>{absCtx.totalActiveAbs || 0}</span>
          </Link>
        </li>
        <li>
          <Link to="/new-ab">New A/B Test</Link>
        </li>
      </ul>
    </div>
  );
}

export default MainNav;
