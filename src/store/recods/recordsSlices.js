import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  records: [],
  recordModal: {},
  stateWarningDelete: false,
  recordToDelete: {},
};

export const records = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state, { payload }) => {
      state.user = {};
    },
    addRecods: (state, actions) => {
      state.records = actions.payload;
    },
    addRecordModal: (state, actions) => {
      state.recordModal = actions.payload;
    },
    addoneRecord: (state, { payload }) => {
      state.records = [...state.records, payload];
    },
    changeStateWarningDelete: (state, action) => {
      state.stateWarningDelete = !state.stateWarningDelete;
    },
    addRecordToDelete: (state, action) => {
      state.recordToDelete = action.payload;
    },
    updateRecord: (state, { payload }) => {
      const dataUpdate = {
        art_nombre: payload.name,
        art_um: payload.um,
        art_precio: payload.price,
        art_unidad: payload.unit,
        art_status: payload.status,
        art_comision: payload.commission,
        art_divisa: payload.currency,
        art_codigo: payload.art_codigo,
      };
      state.records = state.records.map((record) => {
        if (record.art_codigo === payload.art_codigo) {
          return dataUpdate;
        } else {
          return record;
        }
      });
    },

    deleteRecord: (state, { payload }) => {
      const data = {
        art_codigo: payload.art_codigo,
        art_comision: 0,
        art_descripcion: "",
        art_divisa: "",
        art_imageURL: "",
        art_nombre: "Disponible",
        art_peso: 0,
        art_precio: 0,
        art_status: "",
        art_um: 0,
        art_unidad: "",
        ped_numero: 0,
      };
      state.records = state.records.map((record) => {
        if (record.art_codigo === payload.art_codigo) {
          return data;
        } else {
          return record;
        }
      });
    },
  },
});

export const {
  addRecods,
  addRecordModal,
  addoneRecord,
  changeStateWarningDelete,
  addRecordToDelete,
  updateRecord,
  addUser,
  clearUser,
  deleteRecord,
} = records.actions;
