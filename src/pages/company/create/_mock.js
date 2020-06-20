// eslint-disable-next-line import/no-extraneous-dependencies
export default {
    'POST  /api/company': (_, res) => {
        res.send({
            status: 'ok',
            companyId: '1',
        });
    },
};