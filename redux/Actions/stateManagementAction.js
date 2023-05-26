import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getStateManagementLists = createAsyncThunk(
  "state/",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`state/`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStateManagement = createAsyncThunk(
  "state/create",
  async (sData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`state/create`, sData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editStateManagement = createAsyncThunk(
  "state/edit",
  async ({ id, editData }, { rejectWithValue }) => {
    try {
      console.log(id, editData);
      const { data } = await api.patch(
        `state/update?state_id=${id}`,
        editData,
        {
          headers: authHeader(),
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStateManagement = createAsyncThunk(
  "industry/delete",
  async (ID, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`state/delete?state_id=${ID}`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);