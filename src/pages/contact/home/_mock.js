// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /api/contact': (_, res) => {
    res.send({
      meta: {
        status: 'success',
        message: '',
      },
      data: [],
    });
  },
};
