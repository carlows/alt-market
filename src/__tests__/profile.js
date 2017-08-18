// @flow

import { setupIntegrationTests } from '../common/testHelpers';
import React from 'react';
import { UserMock, PublicationMock } from '../__mocks__/data';
import { createWaitForElement } from 'enzyme-wait';
import { GraphQLMocks } from '../__mocks__/requests';

describe('Profile feature', () => {
  test('User should be able to go to the Feed through a link', () => {
    const { wrapper, store } = setupIntegrationTests(GraphQLMocks, '/profile');

    const link = wrapper.find("a[href='/']");

    link.simulate('click', { button: 0 });

    expect(wrapper.find('#feed')).toBeDefined();
  });

  test('Profile view should render User details', async () => {
    const { wrapper, store } = setupIntegrationTests(GraphQLMocks, '/profile');

    const waitFor = createWaitForElement('.profile');

    await waitFor(wrapper);

    const tag = wrapper.find('.profile-username');
    expect(tag.text()).toEqual(`${UserMock.first_name} ${UserMock.last_name}`);

    const email = wrapper.find('.profile-email');
    expect(email.text()).toEqual(UserMock.email);

    const balanceUSD = wrapper.find('.profile-amount.usd');
    expect(balanceUSD.text()).toContain(UserMock.account_balance_USD);

    const balanceBTC = wrapper.find('.profile-amount.btc');
    expect(balanceBTC.text()).toContain(UserMock.account_balance_BTC);
  });
});
