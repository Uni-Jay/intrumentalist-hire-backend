module.exports = (sequelize, DataTypes) => {
     
    const Strikes = sequelize.define("strikes", {
    
      status: {
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

    Strikes.belongsTo(sequelize.models.users, {
      foreignKey: 'user_id',
    });
  
    return Strikes;
  };
  
