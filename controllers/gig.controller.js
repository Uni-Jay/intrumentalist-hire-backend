const db = require("../models");
const Gig = db.Gigs;
const User = db.Users;

// Create a new Gig
exports.createGig = async (req, res) => {
  const { video_url, description, price, instrument, userId } = req.body;

  try {
        
    if(!video_url || !description || !price || !instrument ) {
        return res.status(400).json({error: "Incomplete params"});
    }

    const existingUser = await User.findOne({ where: { id: userId } });

    if(!existingUser) {
        return res.status(404).json({error: "User not found"});
    }
    
    const newGig = await Gig.create({
      video_url,
      description,
      price,
      instrument,
      user_id: existingUser?.id,
    });

    if (newGig) {
      return res.status(201).json({ message: "Gig created successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create gig" });
  }
};

// Read all Gigs
exports.getGigs = async (req, res) => {
  try {
    const gigs = await Gig.findAll();
    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Gig by ID
exports.getGig = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id);
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" });
    }
    res.status(200).json(gig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single user Gigs by ID
exports.getUserGigs = async (req, res) => {
  try {
    const gigs = await Gig.findAll({ where: { user_id: req.params.userId } });
    if (!gigs) {
      return res.status(404).json({ error: "Gigs not found" });
    }
    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a Gig by ID
exports.updateGig = async (req, res) => {
  const { video_url, price, instrument, description, userId } = req.body;

  try {
    if(!video_url || !description || !price || !instrument ) {
        return res.status(400).json({error: "Incomplete params"});
    }

    const existingUser = await User.findOne({ where: { id: userId } });

    if(!existingUser) {
        return res.status(404).json({error: "User not found"});
    }
    

    const existingGig = await Gig.findByPk(req.params.id);

    if (!existingGig) {
      return res.status(404).json({ error: "Gig not found!" });
    }

    const updatedGig = await existingGig.update({
      video_url: video_url || existingGig.video_url,
      price: price || existingGig.price,
      instrument: instrument || existingGig.instrument,
      description: description || existingGig.description,
      user_id: userId || existingGig.user_id,
    }, {
        where: {
            id: existingGig?.id
        }
    });

    if(updatedGig){
        return res.status(200).json({ message: "Gig updated successfully!" });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update gig" });
  }
};

// Delete a Gig by ID
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByPk(req.params.id);

    if (!gig) {
      return res.status(404).json({ error: "Gig not found" });
    }

    await gig.destroy();
    res.status(200).json({ message: "Gig deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
