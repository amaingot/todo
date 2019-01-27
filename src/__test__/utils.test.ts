import { uuidv4 } from '../utils';

describe('[Util] util.ts', () => {
  it('generates uuid', () => {
    const newUuid = uuidv4().toUpperCase();
    const testedUuid =
      newUuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/) || [];

    expect(testedUuid[0]).toEqual(newUuid);
  });
});
