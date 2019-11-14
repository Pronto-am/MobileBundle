import Vue from 'vue';
import {InputCheckbox, InputCode, InputColorPicker, InputDateTime, InputEditor, InputNumber, InputPassword, InputRadio, InputSelect, InputText, InputTime, InputUpload, VueForm} from '@bit/e-sites.vue.global.form';

Vue.component(VueForm.name, VueForm);
Vue.component(InputRadio.name, InputRadio);
Vue.component(InputCheckbox.name, InputCheckbox);
Vue.component(InputText.name, InputText);
Vue.component(InputNumber.name, InputNumber);
Vue.component(InputPassword.name, InputPassword);
Vue.component(InputEditor.name, InputEditor);
Vue.component(InputSelect.name, InputSelect);
Vue.component(InputUpload.name, InputUpload);
Vue.component(InputDateTime.name, InputDateTime);
Vue.component(InputCode.name, InputCode);
Vue.component(InputTime.name, InputTime);
Vue.component(InputColorPicker.name, InputColorPicker);
