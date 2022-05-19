<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink"
          contain
          :src="logo"
          transition="scale-transition"
        />
      </div>
      <v-spacer />

      <template v-slot:extension>
        <v-tabs v-model="tab" centered>
          <v-tab to="/tickets/new">Create Ticket</v-tab>
          <v-tab to="/tickets">View Tickets</v-tab>
          <v-tab to="/agreements">View Agreements</v-tab>
          <v-tab to="/locations">View Locations</v-tab>
          <v-tab to="/equipment">View Equipment</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  data() {
    return {
      tab: null,
      logo
    };
  }
};
</script>

<style></style>
