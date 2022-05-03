import { writable } from 'svelte/store';
import supabase from '$lib/db.js';
import { notifications } from '$lib/toastStore.js';

export const strepen = writable([]);
export const strepers = writable();
export const strepenTotaal = writable();
export const currentStreper = writable();
export const totalen = writable([]);

export const loading = writable(false);

const strepenSub = supabase
	.from('strepen')
	.on('*', (payload) => {
		getStrepenTotaal();
		getTotalen();
		//console.log(payload);
	})
	.subscribe();
// Als er gestreept wordt, de totalen opnieuw ophalen - op basis van een Subscription

export const setCurrentStreper = (naam_kort) => {
	currentStreper.set(naam_kort);
}; //store om de geselecteerde streper vanuit de strepen lijst op te slaan en te gebruiken in de dropdown

export const getTotalen = async () => {
	const { data, error } = await supabase.rpc('totalen').select('*');
	if (error) {
		console.log(error);
	}

	totalen.set(data[0]);
};

export const getStrepers = async () => {
	const { data, error } = await supabase.from('gebruiker').select('*').order('naam_kort');
	if (error) {
		console.log(error);
	}
	strepers.set(data);
}; // Gebruikers (strepers) ophalen

export const getStrepen = async () => {
	let date1 = new Date();
	let date2 = new Date();
	date2.setDate(date2.getDate() - 30);
	const dateString1 = date1.toISOString();
	const dateString2 = date2.toISOString();
	const { data, error } = await supabase
		.from('strepen')
		.select('*')
		.lt('created_at', dateString1)
		.gte('created_at', dateString2);

	if (error) {
		console.log(error);
	}
	strepen.set(data);
}; // Strepen ophalen - Toevoeging gemaakt om een periode van 1 maand te bepalen - ivm grote query

export const getStrepenTotaal = async () => {
	const { data, error } = await supabase.rpc('strepentotaal').select('*');
	if (error) {
		console.log(error);
	}
	strepenTotaal.set(data);
};
getStrepenTotaal(); // Totalen ophalen

export const getFavorieteDag = async (id) => {
	const { data, error } = await supabase.rpc('favdag', { streper: id }).select('*');
	if (error) {
		console.log(error);
	}

	return data[0].dag;
};

export const getAantalDagMaand = async () => {
	const { data, error } = await supabase.rpc('aantalperdagmaand').select('*');
	if (error) {
		console.log(error);
	}

	return data;
};

export const getAantalMaandJaar = async () => {
	const { data, error } = await supabase.rpc('aantalpermaandjaar').select('*');
	if (error) {
		console.log(error);
	}
	console.log(data);
	return data;
};

export const getGemStrepen = async (id) => {
	const { data, error } = await supabase.rpc('gemstrepen', { streper: id }).select('*');
	if (error) {
		console.log(error);
	}

	return data[0].gemiddelde;
};

export const getStrepenTotGebr = async (id) => {
	const { data, error } = await supabase.rpc('strepentotaalgebruiker', { streper: id }).select('*');
	if (error) {
		console.log(error);
	}

	return data[0].aantal;
};

export const addStreep = async (aantal, gebruiker, streper, type, krat) => {
	var datum = new Date();
	console.log(datum);
	const { data, error } = await supabase
		.from('strepen')
		.insert([{ created_at: datum, aantal, gebruiker, type, krat }]);

	if (error) {
		return console.error(error);
	}

	strepen.update((cur) => [...cur, data[0]]);
	notifications.success(
		aantal + (aantal > 1 ? ' streepjes bij ' : ' streepje bij ') + streper + ' genoteerd!',
		1500
	);
}; // NIeuwe streep toevoegen

export const addStreper = async (email, naam_lang, naam_kort, bier) => {
	naam_kort = naam_kort
		.toLowerCase()
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' '); // zorg dat de verkorte naam altijd start met een hoofdletter (ivm sortering)
	const { data, error } = await supabase
		.from('gebruiker')
		.insert([{ email, naam_lang, naam_kort, bier }]);

	if (error) {
		return console.error(error);
	}

	strepers.update((cur) => [...cur, data[0]]);
}; // Nieuwe Streper toevoegen (en store updaten)

export const setBetaald = async (id, naam_kort, aantal, type) => {
	// var datum = !betaald ? new Date().toLocaleString() : null;
	var datum = new Date();

	const { error } = await supabase
		.from('strepen')
		.update({ betaald: true, betaal_datum: datum })
		.eq('gebruiker', id)
		.eq('betaald', false);

	if (error) {
		console.log(error);
	}
	aantal = -Math.abs(aantal);

	const { error: error2 } = await supabase
		.from('strepen')
		.insert([
			{ created_at: datum, aantal, gebruiker: id, betaal_datum: datum, betaald: true, type }
		]);

	if (error2) {
		return console.error(error2);
	}

	notifications.success(naam_kort + ' heeft betaald!!', 1500);

	strepen.update((streep) => {
		for (let i = 0; i < streep.length; i++) {
			if (streep[i].gebruiker === id && streep[i].betaald == false) {
				streep[i].betaald = true;
				streep[i].betaal_datum = new Date(datum);
			}
		}

		return streep;
	});
}; // Alle niet betaalde strepen van een streper op betaald zetten (en Store updaten)
