// eslint-disable-next-line import/no-extraneous-dependencies
export default {
    'PUT  /api/company': (_, res) => {

        res.send({
            status: 'ok',
            update: 'true',
        });
    },
};