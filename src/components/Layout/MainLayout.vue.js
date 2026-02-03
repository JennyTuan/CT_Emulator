/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Layout } from 'ant-design-vue';
import Sidebar from './Sidebar.vue';
import MotionControl from '../Simulator/MotionControl.vue';
import ScanStatus from '../Simulator/ScanStatus.vue';
import GlobalStatus from '../Simulator/GlobalStatus.vue';
import Maintenance from '../Simulator/Maintenance.vue';
import { useSimulatorStore } from '../../store/simulator';
const store = useSimulatorStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Layout;
/** @type {[typeof __VLS_components.Layout, typeof __VLS_components.Layout, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "layout-container" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "layout-container" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = ((__VLS_ctx.Layout.Sider), (__VLS_ctx.Layout.Sider));
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    width: "280",
    ...{ class: "sider-custom" },
}));
const __VLS_7 = __VLS_6({
    width: "280",
    ...{ class: "sider-custom" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
/** @type {[typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_8;
const __VLS_12 = {}.Layout;
/** @type {[typeof __VLS_components.Layout, typeof __VLS_components.Layout, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "content-wrapper" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "content-wrapper" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = ((__VLS_ctx.Layout.Header), (__VLS_ctx.Layout.Header));
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "header-custom" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "header-custom" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "logo-text" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "logo-subtext" },
});
/** @type {[typeof GlobalStatus, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(GlobalStatus, new GlobalStatus({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
var __VLS_19;
const __VLS_23 = ((__VLS_ctx.Layout.Content), (__VLS_ctx.Layout.Content));
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ class: "main-content" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "main-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-8" },
});
/** @type {[typeof ScanStatus, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(ScanStatus, new ScanStatus({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-4" },
});
/** @type {[typeof MotionControl, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(MotionControl, new MotionControl({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-row mt-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-12" },
});
/** @type {[typeof Maintenance, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(Maintenance, new Maintenance({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
var __VLS_26;
const __VLS_36 = ((__VLS_ctx.Layout.Footer), (__VLS_ctx.Layout.Footer));
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ class: "footer-custom" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "footer-custom" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "system-alerts" },
});
if (__VLS_ctx.store.eStopActive) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "alert-item error" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "alert-item success" },
    });
}
var __VLS_39;
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sider-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['header-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['header-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-text']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-subtext']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-8']} */ ;
/** @type {__VLS_StyleScopedClasses['col-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-row']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['system-alerts']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['success']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Layout: Layout,
            Sidebar: Sidebar,
            MotionControl: MotionControl,
            ScanStatus: ScanStatus,
            GlobalStatus: GlobalStatus,
            Maintenance: Maintenance,
            store: store,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MainLayout.vue.js.map