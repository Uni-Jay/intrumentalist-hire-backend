module.exports = (sequelize, DataTypes) => {
     
    const Gig = sequelize.define("gigs", {
    
      video_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      instrument: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER,
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

    Gig.belongsTo(sequelize.models.users, {
        foreignKey: 'user_id',
    });
  
    return Gig;
  };
  
