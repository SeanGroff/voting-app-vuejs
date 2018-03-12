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
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    data() {
      this.$data._chart.destroy()
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
