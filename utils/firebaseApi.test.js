import * as api from './firebaseApi';

describe('firebase API (wrapper)', () => {
  it('should export an object', () => {
    expect(api).toBeDefined();
    expect(typeof api).toEqual('object');
  });
});
