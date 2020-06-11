const jsonMock = {
  page_size: 20,
  total_pages: 20,
  current_page: 2,
  next_page: 3,
  prev_page: 1,
  results: [
    {
      id: 1,
      unit_name: '12-10',
      address: {
        postal_code: 'S160080',
        street: '80 CHAY YAN ST #12-10',
      },
      lease_term: '5 years',
      status: 'ACTIVE',
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: 2,
      unit_name: '11-30',
      address: {
        postal_code: 'S160080',
        street: '80 CHAY YAN ST #12-10',
      },
      lease_term: '2 years',
      status: 'ACTIVE',
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: 3,
      unit_name: '30-50',
      address: {
        postal_code: 'S160080',
        street: '80 CHAY YAN ST #12-10',
      },
      lease_term: '1 year',
      status: 'EXPIRING',
      start_date: new Date(),
      end_date: new Date(),
    },
  ],
};

export default {
  'GET /property_contracts': (req, res) => {
    res.json(jsonMock);
  },
};
