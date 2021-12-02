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
}

const initialState: plantsState = {
  plants: [],
  loadingDelete: false,
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
    setLoadingDelete: (state, action: PayloadAction<boolean>) => {
      state.loadingDelete = action.payload;
    },
  },
});

export const { addPlants, deletePlant,setLoadingDelete } = plantsSlice.actions;

export const deletePlantAsync =
  (plantId: number, onFinish : () => void) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoadingDelete(true))
        await api.delete(`plants/${plantId}`);
        
        dispatch(deletePlant({ plantId }));
        
        onFinish()
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(setLoadingDelete(false))
    }
  };

export const getPlantsAsync = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("plants");

    dispatch(addPlants(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const selectPlants = (state: RootState) => state.plants;

export default plantsSlice.reducer;
