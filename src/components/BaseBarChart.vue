<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BaseBarChart',
  extends: Bar,
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                max: 20,
                min: 0,
                stepSize: 5,
                beginAtZero: true,
                callback: value => Number(value).toFixed(0)
              }
            }
          ]
        }
      }
    }
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>

<style scoped>

</style>
