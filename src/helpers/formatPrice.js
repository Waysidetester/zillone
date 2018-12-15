const formatPirce = price => price.toLocaleString(
  'en-US',
  {
    style: 'currency',
    currency: 'USD',
  },
);

export default formatPirce;
