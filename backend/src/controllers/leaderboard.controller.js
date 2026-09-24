import User from "../model/user.model.js";

const LEADERBOARD_SIZE = 20;

export const getLeaderboard = async (req, res) => {
  const users = await User.find({ totalPoint: { $gt: 0 } })
    .sort({ totalPoint: -1, updatedAt: 1 })
    .limit(LEADERBOARD_SIZE)
    .select("name totalPoint");

  const leaderboard = users.map((user, index) => ({
    id: user._id,
    name: user.name,
    totalPoint: user.totalPoint,
    rank: index + 1,
  }));

  const higher = await User.countDocuments({
    totalPoint: { $gt: req.user.totalPoint },
  });

  res.json({
    success: true,
    leaderboard,
    me: { rank: higher + 1, totalPoint: req.user.totalPoint },
  });
};
