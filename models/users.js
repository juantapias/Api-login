module.exports = (dbConect, type) => {
  return dbConect.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: type.STRING,
    lastname: type.STRING,
    email: type.STRING,
    password: type.STRING,
    role: {
      type: type.STRING,
      allowNull: true
    },
    dni: {
      type: type.INTEGER(25),
      allowNull: true
    },
    phone: {
      type: type.STRING(25),
      allowNull: true
    },
    birthday: type.STRING,
    genre: {
      type: type.STRING,
      allowNull: true
    },
  })
}