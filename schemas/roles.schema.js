const { z } = require("zod");
const mongoose = require("mongoose");

// Define Zod validation schema for Role
const roleSchemaZod = z.object({
  _id: z.string().optional(),
  role: z.string(),
  locations: z.array(z.enum(["BN", "IN"])),
});

// Convert Zod schema into a Mongoose schema
const RoleSchema = new mongoose.Schema({
  // _id: String,
  role: {
    type: String,
    required: true,
    unique: true,
    caseSensitive: false,
  },
  locations: [
    {
      type: String,
      enum: ["BN", "IN"],
      required: true,
    },
  ],
});

module.exports = { RoleSchema, roleSchemaZod };
