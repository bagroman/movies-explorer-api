const allowedCors = [
  'http://bagro.movies.nomoredomains.xyz',
  'https://bagro.movies.nomoredomains.xyz',
  'http://localhost:3000',
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOptions;
