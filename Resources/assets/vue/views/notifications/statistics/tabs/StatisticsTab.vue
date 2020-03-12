<template>
    <div class="card-body">
        <div class="row">
            <div class="col-sm-12 col-md-4">
                <platform-ratio-pie :chart-data="platformRatioData"></platform-ratio-pie>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformRatioPie from "../../../partials/PlatformRatioPie";

    export default {
        components: {PlatformRatioPie},

        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                statistics: null,

                platformRatioData: {
                    datasets: [{
                        data: {},
                        backgroundColor: ['#4BC0C0', '#FF6384']
                    }],
                    labels: ['Android', 'iOS']
                },
            }
        },

        created() {
            axios.get(path('notifications/statistics/:id', {id: this.notification.id})).then(({data: {data: statistics}}) => {
                this.statistics = statistics;

                this.platformRatioData.datasets[0].data = [
                    statistics.platform.filter((platform) => platform.platform === 'android')[0].count,
                    statistics.platform.filter((platform) => platform.platform === 'ios')[0].count,
                ];
            }).catch(error => {
                //
            });
        }
    }
</script>
