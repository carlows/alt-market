// @flow
import React from 'react';
import { gql, graphql } from 'react-apollo';

type DefaultProps = void;
type Props = {
  submit: Function
};
type State = {
  amountBTC: string,
  amountUSD: string
};

/**
 * RechargeCurrency component
 */
class RechargeCurrency extends React.Component<DefaultProps, Props, State> {
  state = {
    amountBTC: '',
    amountUSD: ''
  };

  _onChangeUSD = (event: Object) => {
    this.setState({ amountUSD: event.target.value });
  };

  _onChangeBTC = (event: Object) => {
    this.setState({ amountBTC: event.target.value });
  };

  _rechargeUSD = () => {
    const { amountUSD } = this.state;

    this.props.submit(parseInt(amountUSD, 10), 'USD');
    this.setState({ amountUSD: '' });
  };

  _rechargeBTC = () => {
    const { amountBTC } = this.state;

    this.props.submit(parseInt(amountBTC, 10), 'BTC');
    this.setState({ amountBTC: '' });
  };

  render() {
    const { amountUSD, amountBTC } = this.state;

    return (
      <div>
        <div>
          <p>Recharge USD</p>
          <input
            name="amount-usd"
            value={amountUSD}
            onChange={this._onChangeUSD}
          />
          <button className="btn recharge-usd" onClick={this._rechargeUSD}>
            Submit
          </button>
        </div>
        <div>
          <p>Recharge BTC</p>
          <input
            name="amount-btc"
            value={amountBTC}
            onChange={this._onChangeBTC}
          />
          <button className="btn recharge-btc" onClick={this._rechargeBTC}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const rechargeCurrencyQuery = gql`
  mutation RechargeCurrency($input: RechargeCurrencyInput!) {
    rechargeCurrency(input: $input) {
      user {
        id
        account_balance_BTC
        account_balance_USD
      }
    }
  }
`;

export default graphql(rechargeCurrencyQuery, {
  props: ({ mutate }) => ({
    submit: (amount, currency) =>
      mutate({ variables: { input: { amount, currency } } })
  })
})(RechargeCurrency);
