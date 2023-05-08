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
      const { art_codigo, newRecords } = payload;
      const dataUpdate = {
        art_codigo,
        art_nombre: newRecords.name,
        art_um: newRecords.um,
        art_precio: newRecords.price,
        art_peso: newRecords.weight,
        art_unidad: newRecords.unit,
        art_comision: newRecords.commission,
        art_divisa: newRecords.currency,
        art_status: "u",
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
