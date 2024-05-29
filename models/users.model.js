module.exports = (sequelize, DataTypes) => {
     
    const User = sequelize.define("users", {
    
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      street_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      street_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lga: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email_verified_at: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Date.now(),
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },

    });
  
    return User;
  };
  
