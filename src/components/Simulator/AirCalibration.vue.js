/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Button, Radio } from 'ant-design-vue';
import { useSimulatorStore } from '../../store/simulator';
const store = useSimulatorStore();
const options = {
    rotationSpeed: [1, 2, 0.75],
    focalSpot: ['small', 'big'],
    voltage: [80, 100, 120, 140],
    collimatorWidth: ['32*0.6']
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "air-cal-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "params-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "param-title" },
});
const __VLS_0 = ((__VLS_ctx.Radio.Group), (__VLS_ctx.Radio.Group));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "custom-radio-group" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "custom-radio-group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [val] of __VLS_getVForSourceType((__VLS_ctx.options.rotationSpeed))) {
    const __VLS_4 = {}.Radio;
    /** @type {[typeof __VLS_components.Radio, typeof __VLS_components.Radio, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (val),
        value: (val),
    }));
    const __VLS_6 = __VLS_5({
        key: (val),
        value: (val),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (val);
    var __VLS_7;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "param-title" },
});
const __VLS_8 = ((__VLS_ctx.Radio.Group), (__VLS_ctx.Radio.Group));
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "custom-radio-group" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "custom-radio-group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
for (const [val] of __VLS_getVForSourceType((__VLS_ctx.options.focalSpot))) {
    const __VLS_12 = {}.Radio;
    /** @type {[typeof __VLS_components.Radio, typeof __VLS_components.Radio, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        key: (val),
        value: (val),
    }));
    const __VLS_14 = __VLS_13({
        key: (val),
        value: (val),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    (val);
    var __VLS_15;
}
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "param-title" },
});
const __VLS_16 = ((__VLS_ctx.Radio.Group), (__VLS_ctx.Radio.Group));
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "custom-radio-group" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "custom-radio-group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
for (const [val] of __VLS_getVForSourceType((__VLS_ctx.options.voltage))) {
    const __VLS_20 = {}.Radio;
    /** @type {[typeof __VLS_components.Radio, typeof __VLS_components.Radio, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (val),
        value: (val),
    }));
    const __VLS_22 = __VLS_21({
        key: (val),
        value: (val),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    (val);
    var __VLS_23;
}
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "param-title" },
});
const __VLS_24 = ((__VLS_ctx.Radio.Group), (__VLS_ctx.Radio.Group));
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ class: "custom-radio-group" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "custom-radio-group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
for (const [val] of __VLS_getVForSourceType((__VLS_ctx.options.collimatorWidth))) {
    const __VLS_28 = {}.Radio;
    /** @type {[typeof __VLS_components.Radio, typeof __VLS_components.Radio, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        key: (val),
        value: (val),
    }));
    const __VLS_30 = __VLS_29({
        key: (val),
        value: (val),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    (val);
    var __VLS_31;
}
var __VLS_27;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "summary-line" },
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "highlight warning" },
});
const __VLS_32 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    type: "link",
    ...{ class: "clear-btn" },
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    type: "link",
    ...{ class: "clear-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    onClick: (__VLS_ctx.store.clearAirCalRecords)
};
__VLS_35.slots.default;
var __VLS_35;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-footer" },
});
const __VLS_40 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "start-button" },
    loading: (__VLS_ctx.store.isAirCalibrating),
}));
const __VLS_42 = __VLS_41({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "start-button" },
    loading: (__VLS_ctx.store.isAirCalibrating),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_44;
let __VLS_45;
let __VLS_46;
const __VLS_47 = {
    onClick: (__VLS_ctx.store.startAirCal)
};
__VLS_43.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_43.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "dot" },
    });
}
var __VLS_43;
/** @type {__VLS_StyleScopedClasses['air-cal-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['params-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['param-card']} */ ;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-card']} */ ;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-card']} */ ;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-card']} */ ;
/** @type {__VLS_StyleScopedClasses['param-title']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-line']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-info']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['success']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['warning']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['start-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            Radio: Radio,
            store: store,
            options: options,
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