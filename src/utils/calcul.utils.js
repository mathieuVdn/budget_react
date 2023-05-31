export const sum = (operations) => {
  if (operations === undefined) return [0];
  const amounts = operations.map((operation) => operation.amount);
  return amounts.reduce((a, b) => a + b, 0);
};

export const objectivePercent = (amount, objective) => {
  const percentByEnvelope = Math.round((amount * 100) / objective);
  return [percentByEnvelope];
};
