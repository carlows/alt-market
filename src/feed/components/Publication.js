import React from 'react';

const Publication = ({ title, description, amount, currency }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{amount} - {currency}</p>
    </div>
  );
};

export default Publication;
