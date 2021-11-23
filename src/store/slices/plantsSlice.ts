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
}

const initialState: plantsState = {
  plants: [],
};

export const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlants: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload;
    },
  },
});

export const { addPlants } = plantsSlice.actions;

export const getPlantsAsync = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("plants");

    dispatch(addPlants(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const selectPlants = (state: RootState) => state.plants.plants;

export default plantsSlice.reducer;
