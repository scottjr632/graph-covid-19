import { gcall } from '../../test-utils/gcall';

const stateProperties = ['hash', 'date', 'cases', 'fips', 'state'];

const baseQuery = `
{
	states {
    total
  }
}
`;

const allQuery = `
{
  states {
    nodes {
      hash
      date
      cases
      fips
      state
    }
  }
}
`;

describe('States resolver', () => {
  it('should return a total greater than 0', async () => {
    const res = await gcall({ source: baseQuery });
    expect(res.data).toBeDefined();
    expect(res.data.states.total).toBeGreaterThan(0);
  });
  it('should return a list of nodes with all properties', async () => {
    const res = await gcall({ source: allQuery });
    expect(res.data).toBeDefined();
    expect(res.data.states.nodes).toBeDefined();

    const { nodes } = res.data.states;
    expect(nodes.length).toBeGreaterThan(0);

    for (const prop of stateProperties) {
      expect(nodes[0]).toHaveProperty(prop);
    }
  });
});

const limitTen = `
{
  states(filter: {last: 10}) {
    total
  }
}
`;

const filterState = `
{
  states(filter: {state: "texas", last: 1000}) {
    total
  }
}
`;

describe('States resolver filter', () => {
  it('should be able to get last N', async () => {
    const res = await gcall({ source: limitTen });
    const limit = 10;
    expect(res.data).toBeDefined();
    expect(res.data.states.total).toBeLessThanOrEqual(limit);
  });
  it('should filter by state', async () => {
    const res = await gcall({ source: filterState });
    expect(res.data).toBeDefined();
    expect(res.data.states.total).toBeGreaterThan(0);
  });
});
