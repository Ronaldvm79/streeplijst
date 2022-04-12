export const convDatum = (datumStr) => {
let timestamp = new Date (Date.parse(datumStr))
let datum = timestamp.getDate() + '/' + (timestamp.getMonth()+1) + '/'+timestamp.getFullYear() + ' '+timestamp.getHours()+':'+timestamp.getMinutes()
return datum
}
