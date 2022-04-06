import supabase from '$lib/db'

export const get = async () => {
  try{
    const data = await supabase
    .from('strepen')
    .select(`id,aantal, betaald, gebruiker (naam_kort) `)
   
  
 
  return {
    status: 200,  
    body: data
}
  } catch (error) {
      return{
    status: 404,
    body: error.message
  }
}
}