require("dotenv").config();

const Configs = {
    PORT: process.env.PORT,
    DATABASE_URL:  process.env.DATABASE_URL,
    JWT_SECRET:  process.env.JWT_SECRET,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
}

module.exports = Configs;