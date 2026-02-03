/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';
const store = useSimulatorStore();
const statusColor = computed(() => {
    switch (store.warmUpStatus) {
        case 'running': return 'primary';
        case 'paused': return 'warning';
        case 'finished': return 'success';
        case 'error': return 'error';
        default: return 'grey';
    }
});
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
const __VLS_0 = {}.VAlert;
/** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: (__VLS_ctx.store.warmUpStatus === 'error' ? 'error' : 'warning'),
    variant: "tonal",
    ...{ class: "hint-banner mb-6" },
    border: "start",
}));
const __VLS_2 = __VLS_1({
    type: (__VLS_ctx.store.warmUpStatus === 'error' ? 'error' : 'warning'),
    variant: "tonal",
    ...{ class: "hint-banner mb-6" },
    border: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-space-between align-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.store.warmUpStatus === 'error' ? '预热发生故障，请检查硬件状态' : '提示：热容量低于20%时建议进行预热');
const __VLS_4 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: "small",
    color: (__VLS_ctx.statusColor),
    variant: "flat",
}));
const __VLS_6 = __VLS_5({
    size: "small",
    color: (__VLS_ctx.statusColor),
    variant: "flat",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
(__VLS_ctx.store.warmUpStatus.toUpperCase());
var __VLS_7;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-container d-flex align-center" },
});
const __VLS_8 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: ((Number(__VLS_ctx.store.currentHeatCapacity) || 0).toFixed(2)),
    disabled: true,
    density: "compact",
    variant: "outlined",
    hideDetails: true,
    ...{ class: "custom-input" },
}));
const __VLS_10 = __VLS_9({
    modelValue: ((Number(__VLS_ctx.store.currentHeatCapacity) || 0).toFixed(2)),
    disabled: true,
    density: "compact",
    variant: "outlined",
    hideDetails: true,
    ...{ class: "custom-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "unit ml-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-item mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-container d-flex align-center" },
});
const __VLS_12 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.store.targetHeatCapacity),
    type: "number",
    min: (0),
    max: (100),
    disabled: (__VLS_ctx.store.warmUpStatus === 'running'),
    density: "compact",
    variant: "outlined",
    hideDetails: true,
    ...{ class: "custom-input" },
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.store.targetHeatCapacity),
    type: "number",
    min: (0),
    max: (100),
    disabled: (__VLS_ctx.store.warmUpStatus === 'running'),
    density: "compact",
    variant: "outlined",
    hideDetails: true,
    ...{ class: "custom-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "unit ml-3" },
});
const __VLS_16 = {}.VProgressLinear;
/** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    modelValue: (__VLS_ctx.store.warmUpProgress),
    color: (__VLS_ctx.statusColor),
    height: "10",
    rounded: true,
    striped: true,
    indeterminate: (__VLS_ctx.store.warmUpStatus === 'running'),
    ...{ class: "mt-4 mb-8" },
}));
const __VLS_18 = __VLS_17({
    modelValue: (__VLS_ctx.store.warmUpProgress),
    color: (__VLS_ctx.statusColor),
    height: "10",
    rounded: true,
    striped: true,
    indeterminate: (__VLS_ctx.store.warmUpStatus === 'running'),
    ...{ class: "mt-4 mb-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-footer d-flex gap-2 justify-end" },
});
if (__VLS_ctx.store.warmUpStatus === 'idle' || __VLS_ctx.store.warmUpStatus === 'error' || __VLS_ctx.store.warmUpStatus === 'finished') {
    const __VLS_20 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        color: "primary",
        prependIcon: "mdi-play",
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        color: "primary",
        prependIcon: "mdi-play",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (__VLS_ctx.store.startWarmUp)
    };
    __VLS_23.slots.default;
    var __VLS_23;
}
if (__VLS_ctx.store.warmUpStatus === 'running') {
    const __VLS_28 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        color: "warning",
        prependIcon: "mdi-pause",
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        color: "warning",
        prependIcon: "mdi-pause",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onClick: (__VLS_ctx.store.pauseWarmUp)
    };
    __VLS_31.slots.default;
    var __VLS_31;
}
if (__VLS_ctx.store.warmUpStatus === 'paused') {
    const __VLS_36 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ 'onClick': {} },
        color: "primary",
        prependIcon: "mdi-play-pause",
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onClick': {} },
        color: "primary",
        prependIcon: "mdi-play-pause",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        onClick: (__VLS_ctx.store.resumeWarmUp)
    };
    __VLS_39.slots.default;
    var __VLS_39;
}
if (__VLS_ctx.store.warmUpStatus === 'running' || __VLS_ctx.store.warmUpStatus === 'paused') {
    const __VLS_44 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        color: "error",
        variant: "tonal",
        prependIcon: "mdi-alert-circle",
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        color: "error",
        variant: "tonal",
        prependIcon: "mdi-alert-circle",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.store.failWarmUp)
    };
    __VLS_47.slots.default;
    var __VLS_47;
}
const __VLS_52 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    variant: "outlined",
    prependIcon: "mdi-refresh",
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    variant: "outlined",
    prependIcon: "mdi-refresh",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onClick: (__VLS_ctx.store.resetWarmUp)
};
__VLS_55.slots.default;
var __VLS_55;
/** @type {__VLS_StyleScopedClasses['warm-up-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['hint-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            statusColor: statusColor,
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