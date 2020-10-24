export default {
  async contactCoach(context, payload) {
    const req = {
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(
      `https://xkcd-rn.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(req),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch data!");
      throw error;
    }

    req.id = data.name;
    req.coachId = payload.coachId;

    context.commit("addRequest", req);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const res = await fetch(
      `https://xkcd-rn.firebaseio.com/requests/${coachId}.json`
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch data!");
      throw error;
    }

    var requests = [];

    for (var key in data) {
      const req = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };

      requests.push(req);
    }

    console.log(requests);

    context.commit("setRequests", requests);
  },
};
