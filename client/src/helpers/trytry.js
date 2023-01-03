export function exportable(allCountries, payload) {
    console.log(allCountries, payload, 'AAAAAAAAAAAAAAAA')
    return payload === 'all' ?
    allCountries :
    allCountries.filter(e => e.continent.map(e => e.name).includes(payload))
}