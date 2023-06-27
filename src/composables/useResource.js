import { shallowReactive, toRefs } from "vue";
import Utils from "../helpers/Utils";
import { api } from "../boot/axios";

export default function useResource() {
  const state = shallowReactive({
    loading: false,
    saving: false,
    deleting: false,
    items: [],
  });


  const add = async (data) => {
    try {
      state.saving = true;
      await api.post("/resources/content/add", data);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };

  const get = async () => {
    try {
      state.saving = true;
      return await api.get(`/resources/content/get`);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };


  return {
    ...toRefs(state),
    add,
    get,
  };
}
