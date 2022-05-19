<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-form dense @submit.prevent="submit">
          <v-container class="py-0">
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <h2 class="mt-8">What Equipment Requires Attention?</h2>
                    <v-divider />
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      dense
                      autocomplete="off"
                      :items="equipment"
                      name="equipment"
                      label="Search by Serial Number"
                      v-model="ticket.equipment"
                      item-text="serialNumber"
                      hide-details
                      return-object
                    />
                  </v-col>
                  <v-col cols="12">
                    <ul v-if="ticket.equipment">
                      <li>Description: {{ ticket.equipment.description }}</li>
                      <li>Serial: {{ ticket.equipment.serialNumber }}</li>
                      <li>Model: {{ ticket.equipment.modelNumber }}</li>
                      <li>Location: {{ location.name }}</li>
                    </ul>
                  </v-col>
                </v-row>

                <div v-if="ticket.equipment">
                  <v-row>
                    <v-col cols="12">
                      <h2 class="mt-8">What's the Issue?</h2>
                      <v-divider />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        dense
                        v-model="ticket.problem"
                        name="problem"
                        label="Describe the problem"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <h2 class="mt-8">
                        Who Should We Contact at {{ location.name }}?
                      </h2>
                      <v-divider />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        autocomplete="off"
                        v-model="ticket.contact.name"
                        name="contactName"
                        label="Contact Name"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        autocomplete="off"
                        v-model="ticket.contact.phone"
                        name="contactPhone"
                        label="Customer Phone"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        autocomplete="off"
                        v-model="ticket.contact.phoneExtension"
                        name="contactPhoneExtension"
                        label="Extension"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <h2 class="mt-8">Would You Like Email Confirmation?</h2>
                      <v-divider />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        type="email"
                        v-model="ticket.contact.email"
                        name="contactEmail"
                        label="Confirmation Email"
                      />
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-divider />
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      name="submit"
                      type="submit"
                      color="success"
                      :disabled="!valid"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
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
  data() {
    return {
      ticket: {
        contact: null,
        equipment: null,
        problem: null
      }
    };
  },
  asyncComputed: {
    equipment: {
      get() {
        return apiService.getEquipmentList();
      },
      default: []
    },
    location: {
      get() {
        return apiService.getLocationForEquipment(this.ticket.equipment);
      },
      default: {}
    }
  },
  computed: {
    valid() {
      return (
        this.ticket.problem && this.ticket.equipment && this.ticket.contact
      );
    }
  },
  watch: {
    location(newLocation) {
      this.ticket.contact = {
        name: newLocation.contactName,
        phone: newLocation.phone,
        phoneExtension: newLocation.phoneExtension
      };
    }
  },
  methods: {
    submit() {
      apiService.createTicket(this.ticket).then(ticket => {
        alert(`Successfully created ticket ${ticket.id}`);
        this.ticket = {
          contact: null,
          equipment: null,
          problem: null
        };
      });
    }
  }
};
</script>
