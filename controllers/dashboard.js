const User = require("../models/User");
const Event = require("../models/Event");

exports.getDashboardDetails = async (req, res) => {
	try {
		// Sum of expenses and peopleReached for each event
		let ans = {};
		ans = (
			await Event.aggregate([
				{
					$group: {
						_id: null,
						expenses: { $sum: "$expenses" },
						peopleReached: { $sum: "$peopleReached" }
					}
				}
			])
		)[0];
		// Count of events where status is -2 or -1
		ans.closedReports = await Event.countDocuments({ status: { $in: [-2, -1, 2] } });
		ans.pendingReports = await Event.countDocuments({ status: { $in: [0, 1] } });

		res.status(200).json({
			msg: "success",
			data: {
				...ans
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};
