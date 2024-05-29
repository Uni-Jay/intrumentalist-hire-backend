const db = require("../models");
const Plan = db.Plans;
const User = db.Users;

// Create a new Plan
exports.createPlan = async (req, res) => {
  const { plan_title, plan_description, date, availability_status, time_from, time_to, user_id } = req.body;

  try {
    if(!plan_title || !plan_description || !date || !availability_status || !user_id) {
        return res.status(400).json({error: "Incomplete params"});
    }

    if (availability_status !== "yes" && availability_status !== "no") {
        return res.status(400).json({ error: "Invalid availability status" });
    }

    const existingUser = await User.findOne({ where: { id: user_id } });
    
    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    const newPlan = await Plan.create({
      plan_title,
      plan_description,
      date,
      availability_status,
      time_from,
      time_to,
      user_id
    });

    if (newPlan) {
      return res.status(201).json({ message: "Plan created successfully!" });
    }
  } catch (error) {
    console.error("Plan-Error:", error);
    return res.status(500).json({ error: "Failed to create plan" });
  }
};

// Read all Plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single user Plans by ID
exports.getUserPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({ where: { user_id: req.params.userId } });
    if (!plans) {
      return res.status(404).json({ error: "plans not found" });
    }
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Plan by ID
exports.getPlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a Plan by ID
exports.updatePlan = async (req, res) => {
  const { plan_title, plan_description, date, availability_status, time_from, time_to, user_id } = req.body;

  try {

    if(!plan_title || !plan_description || !date || !availability_status || !user_id) {
        return res.status(400).json({error: "Incomplete params"});
    }
    if (availability_status !== "yes" && availability_status !== "no") {
        return res.status(400).json({ error: "Invalid availability status" });
    }

    const existingUser = await User.findOne({ where: { id: user_id } });
    
    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    const existingPlan = await Plan.findByPk(req.params.id);

    if (!existingPlan) {
      return res.status(404).json({ error: "Plan not found!" });
    }

    const updatedPlan = await Plan.update({
      plan_title: plan_title || existingPlan.plan_title,
      plan_description: plan_description || existingPlan.plan_description,
      date: date || existingPlan.date,
      availability_status: availability_status || existingPlan?.availability_status,
      time_from: time_from || existingPlan?.time_from,
      time_to: time_to || existingPlan?.time_to,
      user_id: user_id || existingUser?.id,
    },  {
        where: {
            id: existingPlan?.id,
        }
    });

    if(updatedPlan) {
        return res.status(200).json({ message: "Plan updated successfully!" });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update plan" });
  }
};

// Delete a Plan by ID
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    await plan.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "Plan deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
