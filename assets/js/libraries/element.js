import Vue from 'vue';

import {
    Alert,
    Avatar,
    Button,
    Checkbox,
    CheckboxGroup,
    Collapse,
    CollapseItem,
    ColorPicker,
    DatePicker,
    Dialog,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Image,
    InfiniteScroll,
    Input,
    InputNumber as InputDigit,
    Loading,
    Message,
    MessageBox,
    Notification,
    Option,
    OptionGroup,
    Progress,
    Radio,
    RadioButton,
    RadioGroup,
    Select,
    Step,
    Steps,
    Switch,
    TabPane,
    Tabs,
    Table,
    TableColumn,
    Tag,
    TimePicker,
    TimeSelect,
    Tooltip,
    Transfer,
    Upload
} from 'element-ui';
import enLang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
// import '../../sass/libraries/_element.scss';
// import 'element-ui/lib/theme-chalk/index.css';

locale.use(enLang);
Vue.component(Alert.name, Alert);
Vue.component(Avatar.name, Avatar);
Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(ColorPicker.name, ColorPicker);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dialog.name, Dialog);
Vue.component(Divider.name, Divider);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Image.name, Image);
Vue.component(Input.name, Input);
Vue.component(InputDigit.name, InputDigit);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Progress.name, Progress);
Vue.component(Radio.name, Radio);
Vue.component(RadioButton.name, RadioButton);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Select.name, Select);
Vue.component(Step.name, Step);
Vue.component(Steps.name, Steps);
Vue.component(Switch.name, Switch);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tabs.name, Tabs);
Vue.component(Tag.name, Tag);
Vue.component(TabPane.name, TabPane);
Vue.component(TimePicker.name, TimePicker);
Vue.component(TimeSelect.name, TimeSelect);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Transfer.name, Transfer);
Vue.component(Upload.name, Upload);

Vue.use(Loading.directive);
Vue.use(InfiniteScroll);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
