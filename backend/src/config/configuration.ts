export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  hostaway: {
    apiUrl: process.env.HOSTAWAY_API_URL || 'https://api.hostaway.com/v1',
    accountId: process.env.HOSTAWAY_ACCOUNT_ID || '61148',
    apiKey:
      process.env.HOSTAWAY_API_KEY ||
      'f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000').split(','),
  },
});

