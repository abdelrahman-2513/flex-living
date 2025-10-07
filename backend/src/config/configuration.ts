export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  hostaway: {
    apiUrl: process.env.HOSTAWAY_API_URL || 'https://api.hostaway.com/v1',
    accountId: process.env.HOSTAWAY_ACCOUNT_ID || 'your-account-id',
    apiKey:
      process.env.HOSTAWAY_API_KEY ||
      'your-api-key',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000').split(','),
  },
});

