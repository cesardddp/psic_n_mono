import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import './style.css'
import App from './App.vue'

import OpenVue from 'openvue/config';
import Aura from '@openvue/themes/aura';

const app = createApp(App);
app.use(createPinia());
app.use(PiniaColada);
app.use(OpenVue, {
     theme: {
        preset: Aura
    }
});

app.mount('#app')
