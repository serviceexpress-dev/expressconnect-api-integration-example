import axios from "axios";

const baseURL = "http://localhost:4002";

const client = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

const queryAPI = (url, params) => {
  return client.get(url, { params }).then(response => {
    return response.data.data;
  });
};

export default {
  getAgreementList() {
    const url = "/agreements";
    return queryAPI(url);
  },
  getEquipmentList(query) {
    const url = "/equipment";
    return queryAPI(url, query);
  },
  getLocationList(query) {
    const url = "/locations";
    return queryAPI(url, query);
  },
  getTicketList() {
    const url = "/serviceTickets";
    return queryAPI(url);
  },
  getLocationForEquipment(equipment) {
    const locationID = equipment && equipment.locationID;
    if (!locationID) {
      return {
        name: "No Equipment Selected"
      };
    }

    const url = `/locations/${equipment.locationID}`;
    return queryAPI(url);
  },
  createTicket(ticket) {
    const url = "/serviceTickets";

    const params = {
      equipmentID: ticket.equipment.id,
      problem: ticket.problem,
      contactName: ticket.contact.name,
      contactPhone: ticket.contact.phone,
      contactPhoneExtension: ticket.contact.phoneExtension,
      confirmationEmail: ticket.contact.email
    };

    return client.post(url, params).then(response => {
      return response.data.data;
    });
  }
};
