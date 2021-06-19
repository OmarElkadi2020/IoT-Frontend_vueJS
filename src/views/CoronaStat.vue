<template>
<!-- <div v-for="CityHistory in CasesHistory.data['09271'].history" :key="CityHistory.date" class="weather-data">
<div class="cases">
<div>
<span>{{CityHistory.date}}</span>
</div>
<div>
<span class="location">{{CityHistory.cases}}</span>
</div>
</div>
</div> -->
<div class="container h-">
<!-- <button v-on:click="getlCases(CasesHistory.data['09271'].history)">Get Corona Data</button> -->
<h5 class="h3 mb-0">Line chart</h5>
  <div class="card">
  <!-- Card header -->
    <div class="d-flex justify-content-around p-3">
      <button type="button" class="btn btn-outline-secondary" @click="add4">2 Monaten weiter </button>
      <button type="button" class="btn btn-outline-secondary" @click="minus4">2 Monten züruck</button>
      <button type="button" class="btn btn-outline-secondary" @click="showLastMonth">Letzte Montat</button>
      <button type="button" class="btn btn-outline-secondary" @click="fullview">Voller Ansicht</button>
    </div>
  <!-- Card body -->
    <div class="card-body ">
      <div class="chart">
        <vue3-chart-js
        :id="lineChart.id"
        :type="lineChart.type"
        ref="chartRef"
        :data="lineChart.data"
        :options="lineChart.options"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import dataLabels from 'chartjs-plugin-datalabels'
import { onBeforeMount, ref } from 'vue'

// globally registered and available for all charts
Vue3ChartJs.registerGlobalPlugins([zoomPlugin])

export default {
  name: 'App',
  components: {
    Vue3ChartJs
  },
  setup () {
    const chartRef = ref(null) // ref(0)
    const cases = []
    const dates = []
    let dateslength = 0
    const CasesHistory = ref({
      data: {
        '09271': {
          history: []
        }
      }
    })
    var CoronaStatBY = {
      data: {}
    }
    // const cases = async () => {
    //   return await getlCases(CasesHistory.value.data['09271'].history)
    // }
    async function getCoronaStat () {
      await axios
        .get('https://api.corona-zahlen.org/districts/09271/history/cases')
        .then(response => (CasesHistory.value = response.data))
    }

    onBeforeMount(async () => {
      await getCoronaStat()
      const his = CasesHistory.value.data['09271'].history

      his.forEach(element => {
        // lineChart.data.labels.push(element.date.substr(0, 10))
        // lineChart.data.datasets[0].data.push(element.cases)
        cases.push(element.cases)
        dates.push(element.date.substr(0, 10))
      })
      dateslength = cases.length
      chartRef.value.update(1)
    })
    const lineChart = {
      id: 'line',
      type: 'bar',
      // locally registered and available for this chart
      plugins: [dataLabels],
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Neubefall',
            data: cases,
            borderColor: 'black',
            backgroundColor: ['#bdc3c7']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'x'
            },
            pan: {
              enabled: true,
              mode: 'xy'
            }
          },
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor
            },
            borderRadius: 4,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: Math.round,
            padding: 6
          }
        },
        scales: {
          x: {
            min: 0,
            max: 500
          }
        }
      }
    }

    const showLastMonth = () => {
      lineChart.options.scales.x.min = dateslength - 30
      lineChart.options.scales.x.max = dateslength

      console.log('here')
      chartRef.value.update(250)
    }
    const add4 = () => {
      if (lineChart.options.scales.x.max <= dateslength - 30) {
        lineChart.options.scales.x.min += 30
        lineChart.options.scales.x.max += 30
      }
      chartRef.value.update(250)
    }
    const minus4 = () => {
      if (lineChart.options.scales.x.min >= 0) {
        lineChart.options.scales.x.min -= 30
        lineChart.options.scales.x.max -= 30
      }
      chartRef.value.update(250)
    }
    const fullview = () => {
      lineChart.options.scales.x.min = 0
      lineChart.options.scales.x.max = dateslength
      chartRef.value.update(250)
    }
    return {
      lineChart,
      CasesHistory,
      CoronaStatBY,
      showLastMonth,
      chartRef,
      add4,
      minus4,
      fullview
    }
  },
  data () {
    // return {
    //   cases: [Number]
    // }
  },
  methods: {
    async getCoronaStat () {
      await axios
        .get('https://api.corona-zahlen.org/germany')
        .then(response => (this.CoronaStatBY = response.data))
    }
  }
}
</script>
