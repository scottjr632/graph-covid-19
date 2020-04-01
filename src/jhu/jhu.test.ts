import { gcall } from '../test-utils/gcall';

const properties = [
  'hash',
  'date',
  'cases',
  'deaths',
  'fips',
  'country',
  'recovered',
  'lat',
  'long',
];

const baseQuery = `
{
	jhu {
		data {
      total
    }
  }
}
`;

const allQuery = `
{
  jhu {
    data {
      nodes {
        hash
        deaths
        recovered
        country
        date
        lat
        long
        cases
        fips
      }
    }
  }
}
`;

describe('The Johns Hopkins resolver', () => {
  it('should return the data', async () => {
    const res = await gcall({ source: baseQuery });
    expect(res.data).toBeDefined();
    expect(res.data.jhu.data.total).toBeGreaterThan(0);
  });
  it('should return a list of nodes with all properties', async () => {
    const res = await gcall({ source: allQuery });
    expect(res.data).toBeDefined();
    expect(res.data.jhu.data.nodes).toBeDefined();

    const { nodes } = res.data.jhu.data;
    for (const prop of properties) {
      expect(nodes[0]).toHaveProperty(prop);
    }
  });
});

const limitTen = `
{
  jhu(filter: {last:10}) {
    data {
			total
    }
  }
}
`;

const filterState = `
{
  jhu(filter: {last:10000, country:"us"}) {
    data {
			total
    }
  }
}
`;

describe('States resolver filter', () => {
  it('should be able to get last N', async () => {
    const res = await gcall({ source: limitTen });
    const limit = 10;
    expect(res.data).toBeDefined();
    expect(res.data.jhu.data.total).toBeLessThanOrEqual(limit);
  });
  it('should filter by state', async () => {
    const res = await gcall({ source: filterState });
    expect(res.data).toBeDefined();
    expect(res.data.jhu.data.total).toBeGreaterThan(0);
  });
});
