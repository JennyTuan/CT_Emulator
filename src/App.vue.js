/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ConfigProvider, theme } from 'ant-design-vue';
import MainLayout from './components/Layout/MainLayout.vue';
// Use dark algorithm for Ant Design Vue
const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: '#1890ff',
        borderRadius: 4,
    },
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ConfigProvider;
/** @type {[typeof __VLS_components.ConfigProvider, typeof __VLS_components.ConfigProvider, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    theme: (__VLS_ctx.darkTheme),
}));
const __VLS_2 = __VLS_1({
    theme: (__VLS_ctx.darkTheme),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
/** @type {[typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConfigProvider: ConfigProvider,
            MainLayout: MainLayout,
            darkTheme: darkTheme,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map