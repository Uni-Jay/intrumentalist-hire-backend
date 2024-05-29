const db = require("../models");
const User = db.Users;
const bcrypt = require("bcryptjs");

// Create a new User
exports.createUser = async (req, res) => {
    const { fullname, username, email, phone_number, street_number, street_name, location, lga, state, password, image} = req.body;

    try {
        //Check if there's an existing user
        const existingUser = await User.findOne({ where: { email: email } });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        };

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
          fullname: fullname, 
          username: username, 
          email: email, 
          phone_number: phone_number, 
          image: image, 
          street_number: street_number, 
          street_name: street_name, 
          location: location, 
          lga: lga, 
          state: state, 
          password: hashedPassword,
        });

        
        if(newUser) {
          return res.status(201).json({ 
            message: "User created successfully!"
          });  
        } 

    } catch(error) {
        return res.status(500).json({ error: "Failed to Register" + error });
    }
   
}

// Read all Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Read a single User by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};



exports.updateUser = async (req, res) => {
    const { fullname, email, phone_number, street_number, street_name, location, lga, state, image } = req.body;
  
    try {
      const existingUser = await User.findByPk(req.params.id);
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
      }

  
      const updatedUser = await existingUser.update({
        fullname: fullname || existingUser.fullname,
        email: email || existingUser.email,
        phone_number: phone_number || existingUser.phone_number,
        image: image || existingUser.image,
        street_number: street_number || existingUser.street_number,
        street_name: street_name || existingUser.street_name,
        location: location || existingUser.location,
        lga: lga || existingUser.lga,
        state: state || existingUser.state,
      },  {
        where: {
            id: req.params.id
        }
      });
  
      return res.status(200).json({ message: "User updated successfully!" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  };
  

// Delete a User by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  } 
};
