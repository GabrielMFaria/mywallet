import joi from "joi";

const transactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().required(),
  type: joi.string().valid("deposit", "withdraw").required()
});

export default transactionSchema;
