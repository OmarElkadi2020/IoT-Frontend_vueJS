<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <div class="container ">
    <!-- <button v-on:click="getlCases(CoronaHisDeg.data['09271'].history)">Get Corona Data</button> -->
    <div class="btn-group d-flex justify-content-around p-3 mx-5 mt-5">
      <a type="button" class="tooltipx" @click="NewCasesHisBayern">
        <span class="tooltiptextx">Bayern</span>
        <i class="material-icons" style="color:#e63c54">lens</i>
      </a>
      <a type="button" class="tooltipx" @click="NewCasesHisDeggendorf"
        ><span class="tooltiptextx">Deggendorf</span
        ><i class="material-icons" style="color:#6f6f6e">lens</i>
      </a>
    </div>
    <div class="card border-success m-2">
      <!-- Card header -->
        <div class="row">
          <div class="col btn-group d-flex justify-content-around p-3 mx-5">
            <a type="button" class="tooltipx" @click="fullView"
              ><span class="tooltiptextx">Voller Ansicht</span
              ><i class="material-icons">fullscreen</i></a
            >
          </div>
          <div class="col btn-group d-flex justify-content-around p-3 mx-5">
            <a type="button" class="tooltipx" @click="currentMonth"
              ><span class="tooltiptextx">Dieser Monat</span
              ><i class="material-icons">today</i></a
            >
            <a type="button" class="tooltipx" @click="monthAxisBack"
              ><span class="tooltiptextx">Monat zurück</span
              ><i class="material-icons">chevron_left</i></a
            >
            <a type="button" class="tooltipx" @click="monthAxisForward"
              ><span class="tooltiptextx">Monat Weiter</span
              ><i class="material-icons">chevron_right</i></a
            >
        </div>
      </div>
      <!-- Card body -->
      <div class="card-body ">
        <div class="chart">
          <vue3-chart-js
            :id="BarChart.id"
            :type="BarChart.type"
            ref="chartRef"
            :data="BarChart.data"
            :options="BarChart.options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/app.scss";
$big_icon: 36px !important;
i {
  color: $thddonaublue;
  font-size: $big_icon;
}
.tooltipx {
  position: relative;
  display: inline-block;
}

.tooltipx .tooltiptextx {
  visibility: hidden;
  width: 120px;
  background-color: $thdblue;
  color: $thdlightgrey;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: 50%;
  margin-left: -60px;
  /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 2s;
}

.tooltipx .tooltiptextx::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: $thdblue transparent transparent transparent;
}

.tooltipx:hover .tooltiptextx {
  visibility: visible;
  opacity: 1;
}
</style>

<script lang="ts">
import axios from 'axios'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import dataLabels from 'chartjs-plugin-datalabels'
import { onBeforeMount, ref } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle'
import { bootstrap } from 'bootstrap/dist/js/bootstrap'

// globally registered and available for all charts
Vue3ChartJs.registerGlobalPlugins([zoomPlugin])

export default {
  name: 'CoronaStat',
  components: {
    Vue3ChartJs
  },
  setup () {
    const chartRef = ref(null) // ref(0)
    let dateslength = 0
    var tooltipList
    const CoronaHisDeg = ref({
      data: {
        '09271': {
          history: []
        }
      }
    })
    const CoronaHisBY = ref({
      data: {
        BY: {
          history: []
        }
      }
    })
    const BarChart = {
      id: 'bar',
      type: 'bar',
      // locally registered and available for this chart
      plugins: [dataLabels],
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: ['Black'],
            backgroundColor: '',
            borderWidth: 0.5,
            borderRadius: 2
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
              mode: 'x'
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
    async function NewCasesHisDeggendorf () {
      await axios
        .get('https://api.corona-zahlen.org/districts/09271/history/cases')
        .then(response => (CoronaHisDeg.value = response.data))
      const his = CoronaHisDeg.value.data['09271'].history
      var cases = []
      var dates = []
      his.forEach(element => {
        // BarChart.data.labels.push(element.date.substr(0, 10))
        // BarChart.data.datasets[0].data.push(element.cases)
        cases.push(element.cases)
        dates.push(element.date.substr(0, 10))
      })
      BarChart.data.datasets[0].data = cases
      BarChart.data.datasets[0].backgroundColor = 'rgba(111,111,110,1)'
      BarChart.data.labels = dates
      BarChart.data.datasets[0].label = 'Deggendorf Covid-19 Neubefälleverlauf'
      dateslength = cases.length
      chartRef.value.update(1)
    }
    const NewCasesHisBayern = async () => {
      await axios
        .get('https://api.corona-zahlen.org/states/BY/history/cases')
        .then(response => (CoronaHisBY.value = response.data))

      const his = CoronaHisBY.value.data.BY.history
      console.log(his)
      var cases = []
      var dates = []
      his.forEach(element => {
        // lineChart.data.labels.push(element.date.substr(0, 10))
        // lineChart.data.datasets[0].data.push(element.cases)
        cases.push(element.cases)
        dates.push(element.date.substr(0, 10))
      })
      BarChart.data.datasets[0].data = cases
      BarChart.data.labels = dates
      BarChart.data.datasets[0].backgroundColor = 'rgba(231,61,85,1)'
      BarChart.data.datasets[0].label = 'Bayer Covid-19 Neubefälleverlauf'
      dateslength = cases.length
      chartRef.value.update()
    }

    onBeforeMount(async () => {
      await NewCasesHisDeggendorf()
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      )
      tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    })

    const currentMonth = () => {
      BarChart.options.scales.x.min = dateslength - 30
      BarChart.options.scales.x.max = dateslength

      console.log('here')
      chartRef.value.update(0)
    }
    const monthAxisForward = () => {
      if (BarChart.options.scales.x.max <= dateslength - 30) {
        BarChart.options.scales.x.min += 30
        BarChart.options.scales.x.max += 30
      }
      chartRef.value.update(0)
    }
    const monthAxisBack = () => {
      if (BarChart.options.scales.x.min >= 0) {
        BarChart.options.scales.x.min -= 30
        BarChart.options.scales.x.max -= 30
      }
      chartRef.value.update(0)
    }
    const fullView = () => {
      BarChart.options.scales.x.min = 0
      BarChart.options.scales.x.max = dateslength
      chartRef.value.update(0)
    }
    return {
      BarChart,
      chartRef,
      monthAxisForward,
      monthAxisBack,
      currentMonth,
      fullView,
      NewCasesHisBayern,
      NewCasesHisDeggendorf,
      tooltipList
    }
  }
}
</script>
