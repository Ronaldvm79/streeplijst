import { writable } from 'svelte/store';
import supabase from "$lib/db.js";

export const strepen = writable([]);
export const drinkers = writable();
export const loading = writable(false);

export const loadUsers = async () => {

  const { data, error } = await supabase
    .from('gebruiker')
    .select('naam_kort')


  drinkers.set(data)


}


export const loadStrepen = async () => {

  const { data, error } = await supabase
    .from('strepen')
    .select(`id,aantal, betaald, gebruiker (naam_kort) `)

  // const { data, error } = await supabase
  // .rpc('aantal').select('*')
  console.log(data)

  if (error) throw new Error(error.message)

  strepen.set(data);

}
//loadTodos()

export const setBetaald = async (id, betaald) => {
  var datum = !betaald ? new Date().toLocaleString() : null;

  const { error } = await supabase
    .from('strepen')
    .update({ betaald: !betaald, betaal_datum: datum })
    .match({ id });

  if (error) {
    console.log(error);
  }
  strepen.update((strepen) => {
    let index = -1;
    for (let i = 0; i < strepen.length; i++) {
      if (strepen[i].id === id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      strepen[index].betaald = !strepen[index].betaald;
    }
    console.log(strepen);
    return strepen;
  });
}