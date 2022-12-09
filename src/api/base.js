import Airtable from "airtable";

const base = new Airtable({apiKey:import.meta.env.VITE_AIRTABLE_API_KEY}).base('appBdhTaSJN8ZKqwU')

export default base;


