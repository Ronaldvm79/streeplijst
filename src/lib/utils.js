export const convDatum = (datumStr) => {
let timestamp = new Date (Date.parse(datumStr))
let datum = timestamp.getDate() + '/' + (timestamp.getMonth()+1) + '/'+timestamp.getFullYear() + ' '+('0'+timestamp.getHours()).slice(-2)+':'+('0'+timestamp.getMinutes()).slice(-2)
return datum
}

