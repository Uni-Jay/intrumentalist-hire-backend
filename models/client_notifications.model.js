module.exports = (sequelize, DataTypes) => {
     
    const Client_Notification = sequelize.define("client_notifications", {

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
  
    return Client_Notification;
  };
  
