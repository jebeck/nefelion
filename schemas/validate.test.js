import validate from './validate';

describe('validate', () => {
  it('should be a function', () => {
    expect(validate).toBeDefined();
    expect(typeof validate).toEqual('function');
  });

  it('should error on a datum without a `type`', () => {
    const datum = {};
    expect(() => validate(datum)).toThrow('No schema for type undefined!');
  });

  it('should error on an invalid datum', () => {
    const datum = {
      amount: 1,
      calories: 110,
      fat: 0.5,
      id: 'ac599b75-4ec3-4a5f-983f-b99818dde78e',
      netCarbs: 24,
      protein: 1,
      recurring: true,
      time: '2018-07-15T06:01:00.000Z',
      timezoneName: 'US/Pacific',
      timezoneOffset: -420,
      totalCarbs: 27,
      trackedTime: '2018-07-15T06:01:00.000Z',
      type: 'food',
      units: 'whole',
    };
    expect(() => validate(datum)).toThrow('Validation failed!');
  });

  it('should return true on a valid datum', () => {
    const datum = {
      amount: 1,
      calories: 110,
      description: 'banana',
      fat: 0.5,
      id: 'ac599b75-4ec3-4a5f-983f-b99818dde78e',
      netCarbs: 24,
      protein: 1,
      recurring: true,
      time: '2018-07-15T06:01:00.000Z',
      timezoneName: 'US/Pacific',
      timezoneOffset: -420,
      totalCarbs: 27,
      trackedTime: '2018-07-15T06:01:00.000Z',
      type: 'food',
      units: 'whole',
    };
    expect(validate(datum)).toEqual(true);
  });
});
