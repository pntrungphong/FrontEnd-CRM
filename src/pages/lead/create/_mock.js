// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /api/lead': (_, res) => {
    res.send({
      code: 0,
      data: [
        {
          id: 1,
          name: 'lead A',
        },
        {
          id: 2,
          name: 'lead B',
        },
        {
          id: 3,
          name: 'lead C',
        },
        {
          id: 4,
          name: 'lead D',
        },
        {
          id: 5,
          name: 'lead E',
        },
      ],
    });
  },
};
