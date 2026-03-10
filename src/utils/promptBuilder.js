// --Bio Writer Prompt--
const buildBioPrompt = ({ name, profession, education, religion, city }) => {
  return `Write a warm, professional and concise "About Me" paragraph for a marriage biodata. 
    The person details are given below:
    -Name: ${name},
    -Profession: ${profession},
    -Education: ${education},
    -Religion: ${religion},
    -City: ${city}

    Instructions:
    - Keep it between 7 to 8 sentences.
    - Tone should be warm, humble and family-oriented.
    - Try to be honest.
    - Do not use first person (avoid "I").
    - Mention values, personality and what they are looking for in a partner.
    - Do not add any heading or label, just the paragraph`;
};

// --Horoscope Summary Prompt--
const horoscopePrompt = ({ rashi, nakshatra, gotra, mangalik }) => {
  return `Write a short horoscope personality and compatibility summary for a marriage biodata.
    Details: 
    - Rashi (Moon Sign): ${rashi},
    - Nakshatra: ${nakshatra},
    - Gotra: ${gotra},
    - Mangalik: ${mangalik} 
    
    Instructions:
    - Keep it between 4 to 5 sentences
    - Mention personality traits associated with this Rashi and Nakshatra.
    - Mention compatibility note based on Manglik status.
    - Keep the tone positive and informative.
    - Add information according to the gotro given.
    - Do not add any heading or label, just the paragraph. `;
};

module.exports = { buildBioPrompt, horoscopePrompt };
