import { useContext } from "react";

import AbContext from "../../setup/ab-context";
import AbList from "../../components/Abs/AbList";

function ActiveAbsPage() {
  const AbsCtx = useContext(AbContext);

  let content;
  AbsCtx.totalActiveAbs === 0
    ? (content = <p>You got no active A/B tests yet. Start adding some?</p>)
    : (content = <AbList abs={AbsCtx.tests} />);

  return (
    <section>
      <h1>Total Active A/B tests</h1>

      {content}
    </section>
  );
}

export default ActiveAbsPage;
