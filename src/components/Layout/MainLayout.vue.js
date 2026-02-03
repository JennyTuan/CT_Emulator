/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useTheme } from 'vuetify';
import Sidebar from './Sidebar.vue';
import MotionControl from '../Simulator/MotionControl.vue';
import ScanStatus from '../Simulator/ScanStatus.vue';
import GlobalStatus from '../Simulator/GlobalStatus.vue';
import Maintenance from '../Simulator/Maintenance.vue';
import { useSimulatorStore } from '../../store/simulator';
import { computed, onMounted } from 'vue';
const store = useSimulatorStore();
const theme = useTheme();
const toggleTheme = () => {
    const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
};
const isDark = computed(() => theme.global.current.value.dark);
onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        theme.global.name.value = savedTheme;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VLayout;
/** @type {[typeof __VLS_components.VLayout, typeof __VLS_components.vLayout, typeof __VLS_components.VLayout, typeof __VLS_components.vLayout, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "rounded rounded-md" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "rounded rounded-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    permanent: true,
    width: "280",
    ...{ class: "sider-custom" },
}));
const __VLS_7 = __VLS_6({
    permanent: true,
    width: "280",
    ...{ class: "sider-custom" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
/** @type {[typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_8;
const __VLS_12 = {}.VAppBar;
/** @type {[typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    flat: true,
    ...{ class: "header-custom px-4" },
}));
const __VLS_14 = __VLS_13({
    flat: true,
    ...{ class: "header-custom px-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "logo-text" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "logo-subtext" },
});
const __VLS_16 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {[typeof GlobalStatus, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(GlobalStatus, new GlobalStatus({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const __VLS_23 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ 'onClick': {} },
    icon: true,
    variant: "text",
    ...{ class: "ml-4" },
    color: (__VLS_ctx.isDark ? 'yellow' : 'primary'),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    icon: true,
    variant: "text",
    ...{ class: "ml-4" },
    color: (__VLS_ctx.isDark ? 'yellow' : 'primary'),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClick: (__VLS_ctx.toggleTheme)
};
__VLS_26.slots.default;
const __VLS_31 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
(__VLS_ctx.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny');
var __VLS_34;
var __VLS_26;
var __VLS_15;
const __VLS_35 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    ...{ class: "main-content" },
}));
const __VLS_37 = __VLS_36({
    ...{ class: "main-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_38.slots.default;
const __VLS_39 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    fluid: true,
    ...{ class: "pa-6" },
}));
const __VLS_41 = __VLS_40({
    fluid: true,
    ...{ class: "pa-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
const __VLS_43 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
__VLS_46.slots.default;
const __VLS_47 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    cols: "8",
}));
const __VLS_49 = __VLS_48({
    cols: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
/** @type {[typeof ScanStatus, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(ScanStatus, new ScanStatus({}));
const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
var __VLS_50;
const __VLS_54 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    cols: "4",
}));
const __VLS_56 = __VLS_55({
    cols: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
/** @type {[typeof MotionControl, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(MotionControl, new MotionControl({}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
var __VLS_57;
var __VLS_46;
const __VLS_61 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ class: "mt-4" },
}));
const __VLS_63 = __VLS_62({
    ...{ class: "mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
const __VLS_65 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    cols: "12",
}));
const __VLS_67 = __VLS_66({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
__VLS_68.slots.default;
/** @type {[typeof Maintenance, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(Maintenance, new Maintenance({}));
const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
var __VLS_68;
var __VLS_64;
var __VLS_42;
var __VLS_38;
const __VLS_72 = {}.VFooter;
/** @type {[typeof __VLS_components.VFooter, typeof __VLS_components.vFooter, typeof __VLS_components.VFooter, typeof __VLS_components.vFooter, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    app: true,
    border: true,
    height: "40",
    ...{ class: "footer-custom px-4" },
}));
const __VLS_74 = __VLS_73({
    app: true,
    border: true,
    height: "40",
    ...{ class: "footer-custom px-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
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
var __VLS_75;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['sider-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['header-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['header-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-text']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-subtext']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['system-alerts']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
/** @type {__VLS_StyleScopedClasses['success']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Sidebar: Sidebar,
            MotionControl: MotionControl,
            ScanStatus: ScanStatus,
            GlobalStatus: GlobalStatus,
            Maintenance: Maintenance,
            store: store,
            toggleTheme: toggleTheme,
            isDark: isDark,
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