import { shallowReactive, toRefs } from "vue";
import Utils from "../helpers/Utils";
import { api } from "../boot/axios";

export default function useUser() {
  const state = shallowReactive({
    loading: false,
    saving: false,
    deleting: false,
    items: [],
  });


  const add = async (data) => {
    try {
      state.saving = true;
      await api.post("/users", data);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };

  const update = async (id, data) => {
    try {
      state.saving = true;
      await api.patch(`/admin/user/${id}`, data);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };

  const trash = async (id, params = "") => {
    try {
      state.deleting = true;
      await api.delete(`/users/${id}?${params}`);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.deleting = false;
    }
  };



  const get = async (id) => {
    try {
      state.loading = true;
      await api.get(`/users/${id}`);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.loading = false;
    }
  };

  const me = async (token) => {
    try {
      state.loading = true;
      return await api.post(`admin/user/me`, { token: token});
    } catch (err) {
      return err
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    add,
    get,
    update,
    trash,
    me

  };
}
