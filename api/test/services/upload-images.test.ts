import assert from 'assert';
import app from '../../src/app';

describe('\'upload-images\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-images');

    assert.ok(service, 'Registered the service');
  });
});
