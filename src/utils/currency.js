export const formatPrice = (price) => {
  // Convert price to rupees (assuming the input is in dollars)
  const priceInRupees = Math.round(price * 83); // Using an approximate conversion rate
  return `₹${priceInRupees.toLocaleString('en-IN')}`;
};