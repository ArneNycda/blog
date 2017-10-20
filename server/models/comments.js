module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postid',
      onDelete: 'CASCADE'
    });
  };

  return Comment;
};
