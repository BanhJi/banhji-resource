import { shallowReactive, toRefs } from "vue";
import Utils from "../helpers/Utils";
import { api } from "../boot/axios";

export default function useShoe() {
  const state = shallowReactive({
    loading: false,
    saving: false,
    deleting: false,
    items: [],
  });

  const saveShoe = async (data, table_number, shoe_no) => {
    try {
      let DB;
      const request = window.indexedDB.open("Baccarat", 4);
      request.onsuccess = async (event) => {
        DB = event.target.result;
        const txn = DB.transaction("Shoe", "readwrite");
        const store = txn.objectStore("Shoe");
        let _data = {
          table_number: table_number,
          shoe_no: shoe_no,
          date: new Date().toISOString(),
          reuslt: JSON.stringify(data),
        };
        let query = store.put(_data);
        query.onsuccess = function (event) {
          console.log(event);
        };
        query.onerror = function (event) {
          console.log(event.target.errorCode);
        };
      };
    } catch (err) {
      throw console.error(err);
    }
  };

  return {
    ...toRefs(state),
    saveShoe,
  };
}
