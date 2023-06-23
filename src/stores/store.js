import { reactive, shallowReactive } from "vue";

export const store = reactive({
  leftDrawerOpen: false,
  isOne: true,
  menuSelect: 0,
  user: {},
  setting: {
    table_no: 0,
    bet_counter: 10,
    verification_code: 123,
    currency: "usd",
    shoe_no: 0,
    usd: {
      min_bp: 0,
      max_bp: 0,
      min_tie: 0,
      max_tie: 0,
      min_pair: 0,
      max_pair: 0,
      min_lucky6: 0,
      max_lucky6: 0,
    },
    thb: {
      min_bp: 0,
      max_bp: 0,
      min_tie: 0,
      max_tie: 0,
      min_pair: 0,
      max_pair: 0,
      min_lucky6: 0,
      max_lucky6: 0,
    },
  },
  isFirst: true
});
