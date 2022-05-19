<template>
  <v-container fluid>
    <v-row justify="center">
      <h1>Agreements</h1>
      <v-col cols="12">
        <v-form dense @submit.prevent="submit">
          <v-container class="py-0">
            <v-row v-for="agreement in agreementList" :key="agreement.id">
              <v-col cols="3">
                <a @click="goToLocationsForAgreement(agreement.id)">
                  {{ agreement.agreementName }}
                </a>
              </v-col>
              <v-col cols="3">Start: {{ agreement.contractStartDate }}</v-col>
              <v-col cols="3">End: {{ agreement.contractEndDate }}</v-col>
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
    agreementList: {
      get: apiService.getAgreementList,
      default: []
    }
  },
  methods: {
    goToLocationsForAgreement(id) {
      this.$router.push(`/locations?agreement=${id}`);
    }
  }
};
</script>
