// @flow

import { setupIntegrationTests } from '../common/testHelpers';
import React from 'react';
import { UserMock, PublicationMock } from '../__mocks__/data';
import { createWaitForElement } from 'enzyme-wait';
import { GraphQLMocks } from '../__mocks__/requests';

describe('Feed feature', () => {
  test('User should be able to go to the Profile through a link', () => {
    const { wrapper, store } = setupIntegrationTests(GraphQLMocks);

    const link = wrapper.find("a[href='/profile']");

    link.simulate('click', { button: 0 });

    expect(wrapper.find('#profile')).toBeDefined();
  });

  test('Profile view should render Feed with publication list', async () => {
    const { wrapper, store } = setupIntegrationTests(GraphQLMocks);

    const waitFor = createWaitForElement('.feed-publications');

    await waitFor(wrapper);

    const tag = wrapper.find('.feed-publications');
    expect(tag.children().length).toEqual(1);

    const title = wrapper.find('.publication h2');
    expect(title.text()).toEqual(PublicationMock.title);
  });
});
