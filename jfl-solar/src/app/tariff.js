const electricalTariffs = {
  DK: 0.53,
  DE: 0.52,
  GB: 0.47,
  IT: 0.46,
  ES: 0.37,
  IE: 0.33,
  JP: 0.25,
  RW: 0.24,
  AU: 0.22,
  SG: 0.22,
  FR: 0.21,
  BR: 0.20,
  PL: 0.18,
  US: 0.18,
  KE: 0.17,
  VE: 0.17,
  CL: 0.17,
  IL: 0.16,
  ZA: 0.15,
  MX: 0.10,
  KR: 0.09,
  AE: 0.08,
  TR: 0.08,
  CN: 0.08,
  IN: 0.07,
  RU: 0.06,
  NG: 0.05,
  SA: 0.05,
  QA: 0.03,
  IR: 0.01
};


async function getReverseGeocode(latitude, longitude, localityLanguage) {
  const fetch = await import('node-fetch').then((module) => module.default);

  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${localityLanguage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return electricalTariffs[data.countryCode];

  } catch (error) {
    console.error(error);
  }
}


getReverseGeocode(37.42159, -122.0837, 'en')
  .then(data => console.log(data))
  .catch(error => console.error(error));
