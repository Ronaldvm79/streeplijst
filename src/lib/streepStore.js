import { writable } from 'svelte/store';
import supabase from '$lib/db.js';
import {notifications} from '$lib/toastStore.js'

export const strepen = writable([]);
export const strepers = writable();
export const strepenTotaal = writable();

export const loading = writable(false);

const strepenSub = supabase
	.from('strepen')
	.on('*', (payload) => {
		getStrepenTotaal();
		//console.log(payload);
	})
	.subscribe();
	// Als er gestreept wordt, de totalen opnieuw ophalen - op basis van een Subscription

export const getStrepers = async () => {
	const { data, error } = await supabase.from('gebruiker').select('*');
	if (error) {
		console.log(error);
	}
	strepers.set(data);
}; // Gebruikers (strepers) ophalen

export const getStrepen = async () => {
	const { data, error } = await supabase.from('strepen').select('*');
	if (error) {
		console.log(error);
	}
	strepen.set(data);
}; // Strepen ophalen

export const getStrepenTotaal = async () => {
	const { data, error } = await supabase.rpc('strepentotaal').select('*');

	strepenTotaal.set(data);
};
getStrepenTotaal(); // Totalen ophalen

export const addStreep = async (aantal, gebruiker,streper) => {
	var datum = new Date()
	const { data, error } = await supabase.from('strepen').insert([{ created_at: datum, aantal, gebruiker }]);

	if (error) {
		return console.error(error);
	}
	console.log(Object.values(data[0]))
	strepen.update((cur) => [...cur, data[0]]);
	notifications.success(aantal + (aantal>1 ? ' streepjes bij ' : ' streepje bij ') + streper + ' genoteerd!', 1500)
}; // NIeuwe streep toevoegen

export const addStreper = async (email, naam_lang, naam_kort, bier) => {
	
	const { data, error } = await supabase.from('gebruiker').insert([{ email,naam_lang, naam_kort, bier }]);

	if (error) {
		return console.error(error);
	}
	
	strepers.update((cur) => [...cur, data[0]]);
	
}; // Nieuwe Streper toevoegen (en store updaten)


export const setBetaald = async (id) => {
	// var datum = !betaald ? new Date().toLocaleString() : null;
	var datum = new Date()

	const { error } = await supabase
		.from('strepen')
		.update({ betaald: true, betaal_datum: datum })
		.eq('gebruiker', id )
		.eq('betaald', false);

	if (error) {
		console.log(error);
	}

	strepen.update((streep) => {
		
		for (let i = 0; i < streep.length; i++) {
			if (streep[i].gebruiker === id && streep[i].betaald == false) {
				streep[i].betaald = true
				streep[i].betaal_datum = new Date(datum);
			};
			}
		
		
		return streep;
		
	});
}; // Alle niet betaalde strepen van een streper op betaald zetten (en Store updaten)
