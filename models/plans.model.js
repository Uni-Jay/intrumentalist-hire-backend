module.exports = (sequelize, DataTypes) => {
     
    const Plan = sequelize.define("plans", {
    
      plan_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      plan_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      availability_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      time_from: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      time_to: {
        type: DataTypes.DATE,
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

    Plan.belongsTo(sequelize.models.users, {
        foreignKey: 'user_id',
    });
  
    return Plan;
  };
  
