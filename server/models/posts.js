module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      foreignKey: 'postid',
      as: 'comments'
    });
    Post.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };

  return Post;
};
