<template>
  <v-container fluid>
    <v-row justify="center">
      <h1>Equipment</h1>
      <v-col cols="12">
        <v-form dense @submit.prevent="submit">
          <v-container class="py-0">
            <v-row v-for="equipment in equipmentList" :key="equipment.id">
              <v-col cols="3">
                <p>{{ equipment.description }}</p>
              </v-col>
              <v-col cols="3">
                <p>{{ equipment.serialNumber }}</p>
              </v-col>
              <v-col cols="3">
                <p><strong>Start:</strong> {{ equipment.contractStartDate }}</p>
              </v-col>
              <v-col cols="3">
                <p><strong>End:</strong> {{ equipment.contractEndDate }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";

import apiService from "@/services/api_service";

export default {
  asyncComputed: {
    equipmentList: {
      get() {
        const location = this.$route.query.location;
        const query = { locationID: location };
        return apiService.getEquipmentList(query).then(results => {
          return _.sortBy(results, "endDate");
        });
      },
      default: []
    }
  }
};
</script>
