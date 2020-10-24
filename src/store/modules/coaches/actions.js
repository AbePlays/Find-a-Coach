export default {
  async registerCoach(context, data) {
    const id = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const res = await fetch(
      `https://xkcd-rn.firebaseio.com/coaches/${id}.json?auth=` + token,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    if (!res.ok) {
      //error handling
    }

    context.commit("registerCoach", { ...coachData, id });
  },
  async loadCoaches(context) {
    const res = await fetch(`https://xkcd-rn.firebaseio.com/coaches.json`);

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch data!");
      throw error;
    }

    var coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
  },
};
