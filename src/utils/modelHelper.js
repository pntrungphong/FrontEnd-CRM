import pick from 'lodash/pick';
import values from 'lodash/valuesIn';

export const getByIds = (ids, state) => {
  return values(pick(state.byId, ids));
};
