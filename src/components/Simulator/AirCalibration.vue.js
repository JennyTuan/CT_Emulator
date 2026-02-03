/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';
const store = useSimulatorStore();
const options = {
    rotationSpeed: [1, 2, 0.75],
    focalSpot: ['small', 'big'],
    voltage: [80, 100, 120, 140],
    collimatorWidth: ['32*0.6']
};
const statusColor = computed(() => {
    switch (store.airCalStatus) {
        case 'running': return 'success';
        case 'paused': return 'warning';
        case 'finished': return 'primary';
        case 'error': return 'error';
        default: return 'grey';
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "air-cal-panel" },
});
const __VLS_0 = {}.VAlert;
/** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: (__VLS_ctx.store.airCalStatus === 'error' ? 'error' : 'info'),
    variant: "tonal",
    ...{ class: "mb-6" },
    border: "start",
}));
const __VLS_2 = __VLS_1({
    type: (__VLS_ctx.store.airCalStatus === 'error' ? 'error' : 'info'),
    variant: "tonal",
    ...{ class: "mb-6" },
    border: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-space-between align-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.store.airCalStatus === 'error' ? '校正过程异常中断' : '请选择需要校正的参数组合');
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
(__VLS_ctx.store.airCalStatus.toUpperCase());
var __VLS_7;
var __VLS_3;
const __VLS_8 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "params-grid" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "params-grid" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
for (const [vals, label] of __VLS_getVForSourceType(({ '旋转速度': __VLS_ctx.options.rotationSpeed, '焦点': __VLS_ctx.options.focalSpot, '电压': __VLS_ctx.options.voltage, '准直器宽度': __VLS_ctx.options.collimatorWidth }))) {
    const __VLS_12 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        cols: "6",
        key: (label),
    }));
    const __VLS_14 = __VLS_13({
        cols: "6",
        key: (label),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    const __VLS_16 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "param-card pa-4" },
        variant: "tonal",
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "param-card pa-4" },
        variant: "tonal",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "param-title mb-4" },
    });
    (label);
    const __VLS_20 = {}.VRadioGroup;
    /** @type {[typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        inline: true,
        hideDetails: true,
        density: "compact",
        disabled: (__VLS_ctx.store.airCalStatus === 'running'),
    }));
    const __VLS_22 = __VLS_21({
        inline: true,
        hideDetails: true,
        density: "compact",
        disabled: (__VLS_ctx.store.airCalStatus === 'running'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    for (const [val] of __VLS_getVForSourceType((vals))) {
        const __VLS_24 = {}.VRadio;
        /** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            key: (val),
            label: (String(val)),
            value: (val),
            color: "primary",
        }));
        const __VLS_26 = __VLS_25({
            key: (val),
            label: (String(val)),
            value: (val),
            color: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    var __VLS_23;
    var __VLS_19;
    var __VLS_15;
}
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "summary-line my-6 pa-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "summary-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "highlight" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "highlight success" },
});
(__VLS_ctx.store.completedAirCalCombinations);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "highlight warning" },
});
(24 - __VLS_ctx.store.completedAirCalCombinations);
const __VLS_28 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    variant: "text",
    size: "small",
    ...{ class: "clear-btn" },
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    variant: "text",
    size: "small",
    ...{ class: "clear-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.store.resetAirCal)
};
__VLS_31.slots.default;
var __VLS_31;
const __VLS_36 = {}.VProgressLinear;
/** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.store.airCalProgress),
    color: (__VLS_ctx.statusColor),
    height: "10",
    rounded: true,
    striped: true,
    indeterminate: (__VLS_ctx.store.airCalStatus === 'running'),
    ...{ class: "mb-8" },
}));
const __VLS_38 = __VLS_37({
    modelValue: (__VLS_ctx.store.airCalProgress),
    color: (__VLS_ctx.statusColor),
    height: "10",
    rounded: true,
    striped: true,
    indeterminate: (__VLS_ctx.store.airCalStatus === 'running'),
    ...{ class: "mb-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-footer d-flex gap-2 justify-end" },
});
if (__VLS_ctx.store.airCalStatus === 'idle' || __VLS_ctx.store.airCalStatus === 'error' || __VLS_ctx.store.airCalStatus === 'finished') {
    const __VLS_40 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        color: "success",
        prependIcon: "mdi-play",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        color: "success",
        prependIcon: "mdi-play",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (__VLS_ctx.store.startAirCal)
    };
    __VLS_43.slots.default;
    var __VLS_43;
}
if (__VLS_ctx.store.airCalStatus === 'running') {
    const __VLS_48 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        color: "warning",
        prependIcon: "mdi-pause",
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        color: "warning",
        prependIcon: "mdi-pause",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (__VLS_ctx.store.pauseAirCal)
    };
    __VLS_51.slots.default;
    var __VLS_51;
}
if (__VLS_ctx.store.airCalStatus === 'paused') {
    const __VLS_56 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ 'onClick': {} },
        color: "success",
        prependIcon: "mdi-play-pause",
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onClick': {} },
        color: "success",
        prependIcon: "mdi-play-pause",
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    let __VLS_62;
    const __VLS_63 = {
        onClick: (__VLS_ctx.store.resumeAirCal)
    };
    __VLS_59.slots.default;
    var __VLS_59;
}
if (__VLS_ctx.store.airCalStatus === 'running' || __VLS_ctx.store.airCalStatus === 'paused') {
    const __VLS_64 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        ...{ 'onClick': {} },
        color: "error",
        variant: "tonal",
        prependIcon: "mdi-alert-circle",
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onClick': {} },
        color: "error",
        variant: "tonal",
        prependIcon: "mdi-alert-circle",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onClick: (__VLS_ctx.store.failAirCal)
    };
    __VLS_67.slots.default;
    var __VLS_67;
}
const __VLS_72 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    variant: "outlined",
    prependIcon: "mdi-refresh",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    variant: "outlined",
    prependIcon: "mdi-refresh",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onClick: (__VLS_ctx.store.resetAirCal)
};
__VLS_75.slots.default;
var __VLS_75;
/** @type {__VLS_StyleScopedClasses['air-cal-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['params-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['param-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-line']} */ ;
/** @type {__VLS_StyleScopedClasses['my-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-info']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['success']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['warning']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-btn']} */ ;
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
            options: options,
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
//# sourceMappingURL=AirCalibration.vue.js.map