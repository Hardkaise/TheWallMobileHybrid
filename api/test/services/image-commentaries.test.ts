import assert from 'assert';
import app from '../../src/app';

describe('\'image-commentaries\' service', () => {
  it('registered the service', () => {
    const service = app.service('image-commentaries');

    assert.ok(service, 'Registered the service');
  });
});
