import { strepenTotaal } from "$lib/streepStore"
import {get} from "svelte/store"

export const convDatum = (datumStr) => {


    let timestamp = new Date (Date.parse(datumStr+'Z'))
let datum = timestamp.getDate() + '/' + (timestamp.getMonth()+1) + '/'+timestamp.getFullYear() + ' '+('0'+timestamp.getHours()).slice(-2)+':'+('0'+timestamp.getMinutes()).slice(-2)
return datum
}
// Z toegevoegd om 'Zulu / Zero / UTC' timezone te definieren


	export const sortStrepen = (volgorde, type) => {
		console.log(volgorde,type)
        if (type == 'abc') {
			console.log(type)
		strepenTotaal.set (get(strepenTotaal).sort((a, b) =>
			volgorde == "asc" ? a.naam_kort.localeCompare(b.naam_kort) : -1*a.naam_kort.localeCompare(b.naam_kort)
		));} 
		else {	
		strepenTotaal.set(get(strepenTotaal).sort((a, b) =>
			volgorde == "asc" ? a.aantal - b.aantal : b.aantal - a.aantal
		));}
        
    }