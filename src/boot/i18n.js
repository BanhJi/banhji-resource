import { createI18n } from "vue-i18n";
import messages from "../i18n";

// set locals to local storage
let locale = localStorage.getItem("locale");
localStorage.setItem("locale", locale ? locale : "en");

console.log("message", messages);

// Create I18n instance
const i18n = createI18n({
  legacy: false,
  locale: "ch",
  globalInjection: true,
  messages,
});
export default i18n;
