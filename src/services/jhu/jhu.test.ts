import datasource from './datasource';

const EXPECTED_PROPERTIES = [
  'fips',
  'lat',
  'long',
  'deaths',
  'recovered',
  'cases',
  'country',
  'state',
  'date',
];

beforeAll(async () => {
  await datasource.initializeData();
});

describe('The John\'s Hopkins dataset', () => {
  it('should grab the data when initialized', async () => {
    expect(datasource.getData().length).toBeGreaterThan(0);
  });
  it('should have that that is the expected shape', () => {
    expect(datasource.getData().length).toBeGreaterThan(0);
    for (const property of EXPECTED_PROPERTIES) {
      expect(datasource.getData()[0]).toHaveProperty(property);
      expect(datasource.getData()[0][property]).toBeDefined();
    }
  });
});
