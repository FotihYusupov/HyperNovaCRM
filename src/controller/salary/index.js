const moment = require("moment");
const cron = require("node-cron");
const Salary = require("../../models/Salary");
const SalaryHistory = require("../../models/SalaryHistory");
const User = require("../../models/User");
const { pagination } = require("../../utils");

// 0 0 1 * * every month
cron.schedule(
  "0 0 1 * *",
  async () => {
    try {
      const users = await User.find({
        deleted: false,
        active: true,
        salary: { $gt: 0 },
      });

      for (user of users) {
        if (user.salary === 0) continue;

        const currentMonth = Math.floor(
          moment().startOf("month").valueOf() / 1000
        );

        const findSalary = await Salary.findOne({
          user: user._id,
          month: currentMonth,
        });

        if (findSalary) continue;

        await Salary.create({
          month: currentMonth,
          amount: user.salary,
          user: user._id,
        });
      }
    } catch (err) {
      console.log({
        message: "Error in calculate user salary.",
        error: err.message,
      });
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Tashkent",
  }
);

exports.getAll = async (req, res) => {
  try {
    const data = await pagination(Salary, req.query, "salaries", "user");
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

// TODO balancedan ayirishni tugatgandan keyin oylik to'lashni tugatish kerak
exports.paySalary = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let amount = +req.body.amount;

    const salaries = await Salary.find({
      deleted: false,
      paid: false,
      user: req.body.user,
    });

    for (item of salaries) {
      if (amount <= 0) break;

      if (item.amount > amount) {
        item.amount - amount;
        amount = 0;
        await item.save();
        break;
      } else if (amount >= item.amount) {
        amount = amount - item.amount;
        item.amount = 0;
        item.paid = true;
        item.paidDate = moment().unix();
        await item.save();
      }
    }

    const newHistory = await SalaryHistory.create({
      amount: +req.body.amount,
      paidDate: moment().unix(),
      user: req.body.user,
    });

    return res.json({
      data: newHistory,
    });
  } catch (err) {
    return res.json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};
