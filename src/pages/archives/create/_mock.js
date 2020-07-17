// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /api/company': (_, res) => {
    res.send({
      code: 0,
      data: [
        {
          id: 1,
          name: 'company A',
        },
        {
          id: 2,
          name: 'company B',
        },
        {
          id: 3,
          name: 'company C',
        },
        {
          id: 4,
          name: 'company D',
        },
        {
          id: 5,
          name: 'company E',
        },
      ],
    });
  },
};
