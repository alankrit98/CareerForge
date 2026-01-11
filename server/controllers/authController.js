const User = require('../models/User');

// @desc    Create or Update User (Sync with Clerk)
// @route   POST /api/v1/auth/sync
const syncUser = async (req, res) => {
  const { clerkId, email, firstName, lastName } = req.body;

  try {
    let user = await User.findOne({ clerkId });

    if (user) {
        // Update existing user if needed
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
        return res.status(200).json({ success: true, data: user });
    }

    // Create new user
    user = new User({ clerkId, email, firstName, lastName });
    await user.save();
    
    res.status(201).json({ success: true, data: user });

  } catch (error) {
    console.error("Auth Sync Error:", error);
    res.status(500).json({ success: false, message: "Server Error syncing user" });
  }
};

module.exports = { syncUser };