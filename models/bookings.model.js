module.exports = (sequelize, DataTypes) => {
     
    const Booking = sequelize.define("bookings", {
    
      showup_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      event_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      event_to: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      event_from: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      event_period: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      event_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      remark: {
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

    Booking.belongsTo(sequelize.models.clients, {
        foreignKey: 'client_id',
    });

    Booking.belongsTo(sequelize.models.users, {
        foreignKey: 'user_id',
    });

    Booking.belongsTo(sequelize.models.events, {
        foreignKey: 'event_id',
    });
  
    return Booking;
  };
  
