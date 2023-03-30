import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import Location from "../types/location";

interface LocationsStore {
  searchQuery: Ref<string>;
  locations: Ref<Location[]> | [];
  searchLoading: Ref<boolean>;
  getLocation: () => Promise<void>;
}

const SEARCH_URL = "https://nominatim.openstreetmap.org/search";

export const useLocationsStore = defineStore(
  "locations",
  (): LocationsStore => {
    const searchQuery = ref("");
    const locations = ref<Location[]>([]);
    const searchLoading = ref(false);

    const getLocation = async () => {
      searchLoading.value = true;
      try {
        const { data } = await axios.get<Location[]>(`${SEARCH_URL}`, {
          params: {
            format: "json",
            addressdetails: 1,
            q: searchQuery.value,
          },
        });
        locations.value = data;
      } catch (error) {
        alert(error);
      } finally {
        searchLoading.value = false;
      }
    };
    return { searchQuery, locations, getLocation, searchLoading };
  }
);
