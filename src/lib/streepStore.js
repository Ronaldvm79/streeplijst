import { writable } from 'svelte/store';
import supabase from "$lib/db.js";

export const strepen = writable([]);
export const loading = writable(false);


export const loadTodos = async () => {
    loading.set(true)
    // const {data, error} = await supabase
    // .from('strepen')
    // .select(`id,aantal, betaald, gebruiker (naam_kort) `)
   
    const { data, error } = await supabase
    .rpc('aantal').select('*')
    console.log(data)

  if (error) throw new Error(error.message)
  
    strepen.set(data);
    loading.set(false);
}
//loadTodos()