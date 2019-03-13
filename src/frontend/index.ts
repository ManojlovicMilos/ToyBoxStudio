import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

import App from "./components/App.vue";
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";

let v = new Vue({
    el: "#app",
    template: `<app />`,
    data: { name: "World" },
    components: {
        App,
        HelloComponent,
        HelloDecoratorComponent
    }
});
