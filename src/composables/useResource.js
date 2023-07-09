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
  const deleteResult = async (data) => {
    try {
      state.saving = true;
      await api.post("/resources/content/delete", data);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };

  const get = async (page) => {
    try {
      let pk = '', sk = ''
      if(page.key.pk) {
        pk = page.key.pk
      }
      if(page.key.sk) {
        sk = page.key.sk
      }
      return await api.get(`/resources/content/get?pageSize=${page.pageSize}&pk=${pk}&sk=${sk}`);
    } catch (err) {
      //throw Error(Utils.getErrorMessage(err));
      throw Utils.getErrorMessage(err);
    } finally {
      state.saving = false;
    }
  };

  const me = async (token) => {
    // try {
      return await api.get(`/resources/auth/me?token=${token}`);
    // } catch (err) {
    //   throw Utils.getErrorMessage(err);
    // } finally {
    //   state.saving = false;
    // }
  };

  const login = async (data) => {
    try {
      return await api.post(`/resources/auth/login`,data);
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
    me,
    login,
    deleteResult
  };
}
