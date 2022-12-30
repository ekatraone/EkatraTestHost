import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

// let res = await axios.get(
//   `https://api.airtable.com/v0/appBdhTaSJN8ZKqwU/Sheet1`,
//   {
//     headers: {
//       Authorization: "Bearer keyT72GFj2QBejf4C",
//     },
//   }
// );
// res.data.records.forEach((rec) => {
//   console.log(rec.fields);
// });

export default base;
