<script>
    import { onMount } from "svelte";
    import {getAantalDagMaand, getAantalMaandJaar} from "$lib/streepStore"
    import Chart from "chart.js/auto";

      let ctx;
  	let myChart
      let grafdata
     export var grafType 
		// $: if (myChart){
		// 	myChart.data.datasets[0].data = aantalpermaand
        //     myChart.data.labels = 
		// 	myChart.update()
		// }

    //    $: dag = aantalpermaand.map(function(dag){return dag.created_at;})
    //    $ aantal = aantalpermaand.map(function(strepen){return strepen.aantal;}),
		
$:grafType
    onMount(async () => {
        console.log(grafType)
        switch (grafType){
            case 'aantaldagmaand':
            grafdata = await getAantalDagMaand()   ; 
            console.log(grafdata)
            break;
            case 'aantalmaandjaar':
            grafdata = await getAantalMaandJaar()   ; 
            console.log(grafdata)
            break;
            }
        
        
        console.log(grafdata)
       

        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: grafdata.map(function(dag){return dag.datum;}),
                datasets: [
                    {
                        label: "# Strepen per Dag",
                        data: grafdata.map(function(strepen){return strepen.aantal;}),
                        backgroundColor: ['#06b6d4', '#0891b2'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
               plugins:{
                legend:{
                    labels:{
                        color: "#f4f4f5",
                    },
                },
               },
                scales: {
                    x: {
                        grid: {
                             color: "#71717a"
                        },
                        ticks: {
                            color: "#f4f4f5"
                         }
                    },
                    y: {
                        grid: {
                             color: "#71717a"
                        },
                        ticks: {
                            color: "#f4f4f5"
                         }
                    },
                    
                },
                
            },
        });
    });
</script>



<canvas id="myChart" width="400" height="400" bind:this={ctx} />