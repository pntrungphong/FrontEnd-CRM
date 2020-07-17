import { message } from 'antd';
import { createTaskTouchpoint, updateTaskTouchpoint, getTask } from '../services/touchpoint';

const User = {
  'chau.dh': '48862ade-6f9a-471f-835a-cff4f3b9a567',
  'tu.tt': '50b0cb2e-3782-4b11-82c0-4e2f6580ab94',
  'khoa.nd': '171ecb82-4daa-43dc-8fec-61878b42d506',
  'nhan.lh': '39d088f6-cc81-4263-ac27-b920983a4eb0',
};

const Model = {
  namespace: 'task',
  state: {
    listTask: [],
  },
  effects: {
    *getTask({ payload }, { call, put }) {
      const response = yield call(getTask, payload);
      const tasks = response.task.map((task) => {
        return {
          id: task.id,
          touchpointId: payload,
          taskname: task.taskname,
          type: task.type,
          userId: task.userId,
          dueDate: task.dueDate,
        };
      });

      yield put({
        type: 'saveListTask',
        payload: tasks,
      });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createTaskTouchpoint, payload);

      if (response != null) {
        const newValue = {
          id: response.id,
          touchpointId: payload.touchpointId,
          taskname: response.taskname,
          type: response.type,
          userId: response.userId,
          dueDate: response.dueDate,
        };
        yield put({
          type: 'addTask',
          payload: newValue,
        });
      }

      message.success('Successfully');
    },
    *update({ payload }, { call, put }) {
      const newData = {
        id: payload.listTask[payload.index].id,
        touchpointId: payload.listTask[payload.index].touchpointId,
        taskname: payload.newData.taskname,
        type: payload.newData.type,
        userId: User[payload.newData.pic],
        duedate: payload.newData.duedate.format('YYYY-MM-DD HH:mm'),
      };
      const response = yield call(updateTaskTouchpoint, newData);
      const updateData = {
        id: response.id,
        touchpointId: payload.listTask[payload.index].touchpointId,
        taskname: payload.newData.taskname,
        type: payload.newData.type,
        userId: User[payload.newData.pic],
        duedate: payload.newData.duedate.format('YYYY-MM-DD HH:mm'),
      };
      yield put({
        type: 'updateTask',
        payload: updateData,
      });
    },
  },

  reducers: {
    saveListTask(state, { payload }) {
      return {
        ...state,
        listTask: payload,
      };
    },
    addTask(state, { payload }) {
      const newList = state.listTask;
      newList.push(payload);
      console.table(newList);
      return {
        ...state,
        listTask: newList,
      };
    },
    updateTask(state, { payload }) {
      const currentList = state.listTask;
      console.table(currentList);
      const index = currentList.findIndex((item) => payload.id === item.id);
      const selectItem = currentList[index];
      currentList.splice(index, 1, { ...selectItem, ...payload });
      return {
        ...state,
        listTask: currentList,
      };
    },
    cleanData(state) {
      return {
        ...state,
        listTask: [],
      };
    },
    removeTask(state, { payload }) {
      const newList = state.listTask;
      newList.push(payload);
      return {
        ...state,
        listTask: newList,
      };
    },
  },
};

export default Model;
