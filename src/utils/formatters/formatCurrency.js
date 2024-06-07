export const formatCurrency = (value) => {
  return parseFloat(
    value.replace("R$", "").replace(".", "").replace(",", ".")
  );
};
