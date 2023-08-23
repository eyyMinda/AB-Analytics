import { createContext, useState } from "react";

const AbContext = createContext({
  tests: [],
  totalTests: 0,
  totalActiveTests: 0,
  addAb: abTest => {},
  removeAb: abTestId => {},
  handleIsActiveAb: abTestId => {},
});

export function AbContextProvider(props) {
  const [abTests, setAbTests] = useState([]);

  function handleAddAb(abTest) {
    return setAbTests(abTests => abTests.concat(abTest));
  }
  function handleRemoveAb(abTestId) {
    return setAbTests(abTests =>
      abTests.filter(abTest => abTest.id !== abTestId)
    );
  }
  function handleIsActiveAb(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId);
  }

  const context = {
    tests: abTests,
    totalAb: abTests.length,
    addAb: handleAddAb,
    removeAb: handleRemoveAb,
    isActiveAb: handleIsActiveAb,
  };

  return (
    <AbContext.Provider value={context}>{props.children}</AbContext.Provider>
  );
}

export default AbContext;
