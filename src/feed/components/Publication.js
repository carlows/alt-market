import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Publication = ({ props }) => (
  <div>
    <h2>{props.publication.title}</h2>
    <p>{props.publication.description}</p>
    <p>{props.publication.amount} - {props.publication.currency}</p>
  </div>
);

export default createFragmentContainer(Publication, graphql`
  fragment Publication_publication on Publication {
    id
    title
    description
    currency
    amount
  }
`);
