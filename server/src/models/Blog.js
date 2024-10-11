module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        model: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        content: DataTypes.TEXT,
        brand: DataTypes.STRING,     
        status: DataTypes.STRING,
        colors: DataTypes.STRING,
    })
    return Blog
}   