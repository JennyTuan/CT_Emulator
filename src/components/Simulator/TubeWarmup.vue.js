/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Button, InputNumber } from 'ant-design-vue';
import { useSimulatorStore } from '../../store/simulator';
const store = useSimulatorStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "warm-up-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hint-banner" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-container" },
});
const __VLS_0 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    value: (__VLS_ctx.store.currentHeatCapacity.toFixed(2)),
    disabled: true,
    ...{ class: "custom-input" },
}));
const __VLS_2 = __VLS_1({
    value: (__VLS_ctx.store.currentHeatCapacity.toFixed(2)),
    disabled: true,
    ...{ class: "custom-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "unit" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-container" },
});
const __VLS_4 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    value: (__VLS_ctx.store.targetHeatCapacity),
    min: (0),
    max: (100),
    ...{ class: "custom-input" },
}));
const __VLS_6 = __VLS_5({
    value: (__VLS_ctx.store.targetHeatCapacity),
    min: (0),
    max: (100),
    ...{ class: "custom-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "unit" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-footer" },
});
const __VLS_8 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "start-button" },
    loading: (__VLS_ctx.store.isWarmingUp),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "start-button" },
    loading: (__VLS_ctx.store.isWarmingUp),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.store.startWarmUp)
};
__VLS_11.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_11.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "dot" },
    });
}
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['warm-up-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['hint-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['start-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            InputNumber: InputNumber,
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
//# sourceMappingURL=TubeWarmup.vue.js.map