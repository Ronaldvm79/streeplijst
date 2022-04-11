import { writable } from 'svelte/store';
import supabase from '$lib/db.js';

export const strepen = writable([]);
export const drinkers = writable();
export const strepenTotaal = writable();

export const loading = writable(false);

const strepenSub = supabase
	.from('strepen')
	.on('*', (payload) => {
		getStrepenTotaal();
		//console.log(payload);
	})
	.subscribe();

export const loadUsers = async () => {
	const { data, error } = await supabase.from('gebruiker').select('*');
	if (error) {
		console.log(error);
	}
	drinkers.set(data);
};

export const loadStrepen = async () => {
	const { data, error } = await supabase.from('strepen').select('*');
	// const { data, error } = await supabase
	// .rpc('aantal').select('*')
	if (error) {
		console.log(error);
	}
	strepen.set(data);
};

export const getStrepenTotaal = async () => {
	const { data, error } = await supabase.rpc('drinkers').select('*');

	strepenTotaal.set(data);
};
getStrepenTotaal();

export const addStreep = async (aantal, gebruiker) => {
	const { data, error } = await supabase.from('strepen').insert([{ aantal, gebruiker }]);

	if (error) {
		return console.error(error);
	}
	
	strepen.update((cur) => [...cur, data[0]]);
};

export const setBetaald = async (id) => {
	// var datum = !betaald ? new Date().toLocaleString() : null;
	var datum = new Date().toLocaleString();

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
};
