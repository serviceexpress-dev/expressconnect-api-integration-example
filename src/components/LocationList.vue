<template>
  <v-container fluid>
    <v-row justify="center">
      <h1>Locations</h1>
      <v-col cols="12">
        <v-form dense @submit.prevent="submit">
          <v-container class="py-0">
            <v-row v-for="location in locationList" :key="location.id">
              <v-col cols="6">
                <a @click="goToEquipmentForLocation(location.id)">{{
                  location.name
                }}</a>
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
    locationList: {
      get() {
        const agreement = this.$route.query.agreement;
        const query = { agreementID: agreement };
        return apiService.getLocationList(query);
      },
      default: []
    }
  },
  methods: {
    goToEquipmentForLocation(id) {
      this.$router.push(`/equipment?location=${id}`);
    }
  }
};
</script>
