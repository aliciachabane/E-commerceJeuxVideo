import React, { useMemo } from 'react';

function HeavyComponent({ dep }) {
    const computeHeavyValue = (input) => {
    // traitement lourd simulé
    return input * 10;
  };

  const memoizedValue = useMemo(() => computeHeavyValue(dep), [dep]);

  return (
    <div>
      <h2>Heavy Component</h2>
      <p>Valeur mémoïsée : {memoizedValue}</p>
    </div>
  );
}

export default React.memo(HeavyComponent);
