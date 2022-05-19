import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import Router from "vue-router";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import TicketForm from "./components/TicketForm.vue";
import TicketList from "./components/TicketList.vue";
import AgreementList from "./components/AgreementList.vue";
import LocationList from "./components/LocationList.vue";
import EquipmentList from "./components/EquipmentList.vue";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);
Vue.use(Router);

const routes = [
  { name: "root", path: "/", redirect: "/agreements" },
  { name: "ticketForm", path: "/tickets/new", component: TicketForm },
  { name: "ticketList", path: "/tickets", component: TicketList },
  { name: "agreementList", path: "/agreements", component: AgreementList },
  { name: "locationList", path: "/locations", component: LocationList },
  { name: "equipmentList", path: "/equipment", component: EquipmentList }
];

const router = new Router({ routes });

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
