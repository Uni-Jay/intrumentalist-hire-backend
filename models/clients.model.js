module.exports = (sequelize, DataTypes) => {
     
    const Client = sequelize.define("clients", {
    
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
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

    return Client
  };
  
