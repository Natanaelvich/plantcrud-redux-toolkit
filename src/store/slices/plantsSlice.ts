import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import api from "../../services/api";

export type Plant = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
};

export interface plantsState {
  plants: Plant[];
  loadingDelete: boolean;
  loadingGet: boolean;
  loadingEdit: boolean;
}

const initialState: plantsState = {
    plants: [],
    loadingDelete: false,
    loadingGet: false,
    loadingEdit: false
};

export const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlants: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload;
    },
    deletePlant: (state, action: PayloadAction<{ plantId: number }>) => {
      state.plants = state.plants.filter(
        (p) => p.id !== action.payload.plantId
      );
    },
    editPlant: (state, action: PayloadAction<{ plant: Plant }>) => {
        const {plant} = action.payload

      state.plants = state.plants.map(
        (p) => p.id === plant.id ? plant : p
      );
    },
    setLoadingDelete: (state, action: PayloadAction<boolean>) => {
      state.loadingDelete = action.payload;
    },
    setLoadingGet: (state, action: PayloadAction<boolean>) => {
      state.loadingGet = action.payload;
    },
    setLoadingEdit: (state, action: PayloadAction<boolean>) => {
      state.loadingEdit = action.payload;
    },
  },
});

export const { addPlants, deletePlant,editPlant, setLoadingDelete, setLoadingGet, setLoadingEdit } =
  plantsSlice.actions;

export const deletePlantAsync =
  (plantId: number, onFinish: () => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingDelete(true));
      await api.delete(`plants/${plantId}`);

      dispatch(deletePlant({ plantId }));

      onFinish();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingDelete(false));
    }
  };

export const editPlantAsync =
  (plant: Plant, onFinish: () => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingEdit(true));
      await api.put(`plants/${plant.id}`,plant);

      dispatch(editPlant({ plant }));

      onFinish();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingEdit(false));
    }
  };

export const getPlantsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoadingGet(true));
    const response = await api.get("plants");

    dispatch(addPlants(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoadingGet(false));
  }
};

export const selectPlants = (state: RootState) => state.plants;

export default plantsSlice.reducer;
