// import Joi from "joi";

// const validateAd = (data, forCreation = true) => {
//     const presence = forCreation ? "required" : "optional";
//     return Joi.object({
//         title: Joi.string()
//             .pattern(/^[A-Za-zÀ-ÿ0-9_-]+(?:\s[A-Za-zÀ-ÿ0-9_-]+)*$/)
//             .min(1)
//             .max(50)
//             .allow("", null)
//             .presence("optional"),

//         description: Joi.string()
//             .pattern(/^[A-Za-zÀ-ÿ\s\-']+$/)
//             .min(1)
//             .max(50)
//             .presence(presence),

//         owner: Joi.string()
//             .pattern(/^[A-Za-zÀ-ÿ\s\-']+$/)
//             .min(1)
//             .max(50)
//             .presence(presence),

//         price: Joi.number()
//             .integer()
//             .min(0)
//             .max(1000000)
//             .presence(presence),

//         picture: Joi.string()
//             .uri({ allowRelative: true })
//             .max(255)
//             .allow("", null)
//             .presence("optional"),

//         location: Joi.string()
//             .pattern(/^[A-Za-zÀ-ÿ\s\-']+$/)
//             .min(1)
//             .max(50)
//             .presence(presence),

//         categoryId: Joi.number()
//             .integer()
//             .min(0)
//             .max(1000000)
//             .presence(presence),

//         createdAt: Joi.string()
//             .pattern(/^[A-Za-zÀ-ÿ\s\-']+$/)
//             .min(1)
//             .max(50)
//             .presence(presence),

//     }).validate(data, { abortEarly: false });
// };
