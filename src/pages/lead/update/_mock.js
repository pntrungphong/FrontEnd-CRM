// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'GET  /api/lead/23': (_, res) => {
    res.send({
      code: 0,
      data: {
        name: 'test',
        address: 'test',
        email: " 'test'",
        phone: 'test',
        title: 'text',
        website: 'test',
        url: 'test',
        created_by: 'test',
        updated_by: 'test',
      },
    });
  },
};