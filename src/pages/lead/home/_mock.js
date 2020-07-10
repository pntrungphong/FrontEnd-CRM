// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'GET  /api/company': (_, res) => {
    res.send({
      code: 0,
      data: {
        name: 'test',
        time: 'test',
        title: 'test',
        goal: 'test',
        created_by: 'test',
        updated_by: 'test',
      },
    });
  },
};
