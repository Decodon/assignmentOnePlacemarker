export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  placemarkers: {
    _model: "Placemarker",
    town: {
      title: "Timoleague",
      userid: "->users.bart",
    },
  },
  details: {
    _model: "Detail",
    detail_1: {
      name: "Timoleague Abbey",
      year: 1687,
      latitude: -45.2,
      longitude: 112.21,
      religion: "Christian",
      placemarkerid: "->placemarkers.town",
    },
    detail_2: {
      name: "Timoleague Catholic",
      year: 117,
      latitude: -45.3,
      longitude: 112.1,
      religion: "Christian",
      placemarkerid: "->placemarkers.town",
    },
  },
};
