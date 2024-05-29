const db = require("../models");
const Strikes = db.Strikes;
const User = db.Users;

// Create a new Strike
exports.createStrike = async (req, res) => {
  const { status, user_id } = req.body;

  try {
    
    if(!status || !user_id) {
        return res.status(400).json({error: "Incomplete params"});
    }

    const existingUser = await User.findOne({ where: { id: user_id } });
    
    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    const newStrike = await Strikes.create({
      status,
      user_id: existingUser?.id
    });

    if (newStrike) {
      return res.status(201).json({ message: "Strike created successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create strike" });
  }
};

// Read all Strikes
exports.getStrikes = async (req, res) => {
  try {
    const strikes = await Strikes.findAll();
    res.status(200).json(strikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Strike by ID
exports.getStrike = async (req, res) => {
  try {
    const strike = await Strikes.findByPk(req.params.id);
    if (!strike) {
      return res.status(404).json({ error: "Strike not found" });
    }
    res.status(200).json(strike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a Strike by ID
exports.updateStrike = async (req, res) => {
  const { status, user_id } = req.body;

  try {
        
    if(!status || !user_id) {
        return res.status(400).json({error: "Incomplete params"});
    }

    const existingUser = await User.findOne({ where: { id: user_id } });
    
    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    const existingStrike = await Strikes.findByPk(req.params.id);

    if (!existingStrike) {
      return res.status(404).json({ message: "Strike not found!" });
    }

    const updatedStrike = await existingStrike.update({
      status: status || existingStrike.status,
      user_id: user_id || existingUser?.id,
    }, {
        where: {
            id: req.params.id
        }
    });

    if(updatedStrike){
        return res.status(200).json({ message: "Strike updated successfully!" });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update strike" });
  }
};

// Delete a Strike by ID
exports.deleteStrike = async (req, res) => {
  try {
    const strike = await Strikes.findByPk(req.params.id);

    if (!strike) {
      return res.status(404).json({ error: "Strike not found" });
    }

    await strike.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "Strike deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
