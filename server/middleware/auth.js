const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Strict middleware: Rejects request if not logged in
const requireAuth = ClerkExpressRequireAuth({
  // options if needed
});

module.exports = { requireAuth };