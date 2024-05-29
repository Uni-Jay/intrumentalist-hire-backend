module.exports = (sequelize, DataTypes) => {
     
    const Notifications = sequelize.define("notificationss", {

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
  
    return Notifications;
  };
  
