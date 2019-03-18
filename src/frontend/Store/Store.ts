import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './Types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '0.1.0',
        cliVersion: '0.0.3',
        project: { },
        projectExists: false
    }
};

export default new Vuex.Store<RootState>(store);