module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true  //index
        },
        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

    });
 

    return Doctor;
};