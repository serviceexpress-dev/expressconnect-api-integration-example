<template>
  <v-container fluid>
    <v-row justify="center">
      <h1>Tickets</h1>
      <v-col cols="12">
        <v-form dense @submit.prevent="submit">
          <v-container class="py-0">
            <v-row>
              <v-col v-for="ticket in ticketList" :key="ticket.id">
                {{ ticket.id }}
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiService from "@/services/api_service";

export default {
  asyncComputed: {
    ticketList: {
      get: apiService.getTicketList,
      default: []
    }
  }
};
</script>
