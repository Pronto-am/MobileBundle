import Vue from 'vue';
import {
    Alert,
    Badge,
    Button,
    Checkbox,
    Collapse,
    CollapseItem,
    ColorPicker,
    DatePicker,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
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
    Select,
    TabPane,
    Tabs,
    Table,
    TableColumn,
    Tag,
    TimeSelect,
    Tooltip,
    Transfer,
    Upload
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/nl';
import locale from 'element-ui/lib/locale';
import '../../scss/libraries/_element.scss';
// import 'element-ui/lib/theme-chalk/index.css';

locale.use(lang);
Vue.component(Alert.name, Alert);
Vue.component(Badge.name, Badge);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Input.name, Input);
Vue.component(InputDigit.name, InputDigit);
Vue.component(Radio.name, Radio);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Tag.name, Tag);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Progress.name, Progress);
Vue.component(Upload.name, Upload);
Vue.component(TabPane.name, TabPane);
Vue.component(Tabs.name, Tabs);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Transfer.name, Transfer);
Vue.component(Dialog.name, Dialog);
Vue.component(TimeSelect.name, TimeSelect);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(ColorPicker.name, ColorPicker);

Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
