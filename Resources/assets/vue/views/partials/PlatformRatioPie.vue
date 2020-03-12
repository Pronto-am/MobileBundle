<script>
    import {Pie, mixins} from 'vue-chartjs';

    export default {
        extends: Pie,
        mixins: [mixins.reactiveProp],
        props: ['chart-data'],
        mounted() {
            this.renderChart(this.chartData, {
                maintainAspectRatio: false
            });
        }
    }
</script>
