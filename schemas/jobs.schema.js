const { z } = require('zod');
const mongoose = require('mongoose');
const { RoleSchema, roleSchemaZod } = require('./roles.schema');

// Define Zod validation schema for Job
const jobSchemaZod = z.object({
  _id: z.string().optional(),
  category: z.string(),
  roles: z.array(roleSchemaZod)
});

// Convert Zod schema into a Mongoose schema
const JobSchema = new mongoose.Schema({
  // _id: String,
  category: {
    type: String,
    required: true,
    unique: true,
    caseSensitive: false,
  },
  roles: [RoleSchema]
});

module.exports = {JobSchema, jobSchemaZod};
