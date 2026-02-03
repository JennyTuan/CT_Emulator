/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { Space, Badge } from 'ant-design-vue';
const store = useSimulatorStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "global-status-badges" },
});
const __VLS_0 = {}.Space;
/** @type {[typeof __VLS_components.Space, typeof __VLS_components.Space, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (24),
}));
const __VLS_2 = __VLS_1({
    size: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-indicator" },
});
const __VLS_4 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    status: (__VLS_ctx.store.laserOn ? 'warning' : 'default'),
}));
const __VLS_6 = __VLS_5({
    status: (__VLS_ctx.store.laserOn ? 'warning' : 'default'),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
    ...{ class: ({ 'text-warning': __VLS_ctx.store.laserOn }) },
});
(__VLS_ctx.store.laserOn ? 'ACTIVE' : 'READY');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-indicator" },
});
const __VLS_8 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    status: (__VLS_ctx.store.isWarmingUp ? 'processing' : (__VLS_ctx.store.warmUpProgress === 100 ? 'success' : 'default')),
}));
const __VLS_10 = __VLS_9({
    status: (__VLS_ctx.store.isWarmingUp ? 'processing' : (__VLS_ctx.store.warmUpProgress === 100 ? 'success' : 'default')),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
(__VLS_ctx.store.warmUpProgress);
(__VLS_ctx.store.isWarmingUp ? 'WARMING...' : 'READY');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-indicator" },
});
const __VLS_12 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    status: (__VLS_ctx.store.eStopActive ? 'error' : 'success'),
}));
const __VLS_14 = __VLS_13({
    status: (__VLS_ctx.store.eStopActive ? 'error' : 'success'),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
    ...{ class: ({ 'text-error': __VLS_ctx.store.eStopActive }) },
});
(__VLS_ctx.store.eStopActive ? 'E-STOP' : 'OK');
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['global-status-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Space: Space,
            Badge: Badge,
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
//# sourceMappingURL=GlobalStatus.vue.js.map