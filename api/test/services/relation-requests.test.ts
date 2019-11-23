import assert from 'assert';
import app from '../../src/app';

describe('\'relation-requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('relation-requests');

    assert.ok(service, 'Registered the service');
  });
});
