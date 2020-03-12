import PushNotificationForm from '../partials/PushNotificationForm';

export default {
    components: {PushNotificationForm},

    props: {
        id: {
            required: false,
            default: null
        }
    },

    data() {
        return {
            item: null,
            segments: [],
            testDevices: [],
        }
    },

    beforeRouteEnter(to, from, next) {
        let calls = [
            axios.get(path('notifications/segments/list')),
            axios.get(path('devices/list'), {
                params: {
                    filters: {
                        test: true
                    }
                }
            })
        ];

        if (to.params.id) {
            calls.push(axios.get(path('notifications/:id', {id: to.params.id})));
        }

        axios.all(calls).then((response) => {
            next(vm => {

                vm.segments = response[0].data.data;
                vm.testDevices = response[1].data.data;

                if(to.params.id) {
                    vm.item = response[2].data.data;
                    vm.item.scheduled = vm.item.scheduled_sending !== null;
                    vm.item.segment_id = vm.item.segment.id;

                    // Update selection of test devices
                    vm.selectedTestDevices = vm.testDevices.filter((device) => vm.item.test_devices.indexOf(device.id) > -1);
                } else {
                    vm.item = {
                        // Localizable fields
                        title: {},
                        content: {},
                        click_action_url: {},
                        click_action_html: {},
                        scheduled: false,
                    }
                }
            });
        }).catch(error => {
            next();
        });
    },
}
