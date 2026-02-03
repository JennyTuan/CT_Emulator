/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
const store = useSimulatorStore();
const moveStep = (axis, amount) => {
    if (axis === 'gantry')
        store.gantryPosition += amount;
    if (axis === 'v')
        store.tableVertical += amount;
    if (axis === 'h')
        store.tableHorizontal += amount;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['quick-positions']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "motion-card fill-height" },
    variant: "flat",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "motion-card fill-height" },
    variant: "flat",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "card-title-container pa-4" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "card-title-container pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    color: "primary",
    ...{ class: "mr-2" },
}));
const __VLS_11 = __VLS_10({
    color: "primary",
    ...{ class: "mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_8;
const __VLS_13 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "pa-4" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-value" },
});
(__VLS_ctx.store.gantryPosition.toFixed(1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-controls" },
});
const __VLS_17 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-left",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_19 = __VLS_18({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-left",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_21;
let __VLS_22;
let __VLS_23;
const __VLS_24 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('gantry', -1);
    }
};
var __VLS_20;
const __VLS_25 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.store.gantryPosition),
    min: (-30),
    max: (30),
    step: (0.5),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.store.gantryPosition),
    min: (-30),
    max: (30),
    step: (0.5),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_29 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-right",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-right",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('gantry', 1);
    }
};
var __VLS_32;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-value" },
});
(__VLS_ctx.store.tableVertical.toFixed(1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-controls" },
});
const __VLS_37 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-down",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-down",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('v', -5);
    }
};
var __VLS_40;
const __VLS_45 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    modelValue: (__VLS_ctx.store.tableVertical),
    min: (0),
    max: (300),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.store.tableVertical),
    min: (0),
    max: (300),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_49 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-up",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_51 = __VLS_50({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-up",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_53;
let __VLS_54;
let __VLS_55;
const __VLS_56 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('v', 5);
    }
};
var __VLS_52;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "axis-value" },
});
(__VLS_ctx.store.tableHorizontal.toFixed(1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "axis-controls" },
});
const __VLS_57 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-down",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-down",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('h', -10);
    }
};
var __VLS_60;
const __VLS_65 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    modelValue: (__VLS_ctx.store.tableHorizontal),
    min: (0),
    max: (2000),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}));
const __VLS_67 = __VLS_66({
    modelValue: (__VLS_ctx.store.tableHorizontal),
    min: (0),
    max: (2000),
    hideDetails: true,
    color: "primary",
    ...{ class: "axis-slider mx-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const __VLS_69 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-up",
    density: "compact",
    variant: "text",
    size: "small",
}));
const __VLS_71 = __VLS_70({
    ...{ 'onClick': {} },
    icon: "mdi-chevron-up",
    density: "compact",
    variant: "text",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
let __VLS_73;
let __VLS_74;
let __VLS_75;
const __VLS_76 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('h', 10);
    }
};
var __VLS_72;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "motion-visualizer mt-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "gantry-ring" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "gantry-tilt-indicator" },
    ...{ style: ({ transform: `rotate(${__VLS_ctx.store.gantryPosition}deg)` }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-v" },
    ...{ style: ({ bottom: `${(__VLS_ctx.store.tableVertical / 300) * 100}%` }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "quick-positions pt-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex gap-2" },
});
const __VLS_77 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
}));
const __VLS_79 = __VLS_78({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
let __VLS_81;
let __VLS_82;
let __VLS_83;
const __VLS_84 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 0;
        __VLS_ctx.store.tableVertical = 150;
    }
};
__VLS_80.slots.default;
var __VLS_80;
const __VLS_85 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
    ...{ class: "mx-2" },
}));
const __VLS_87 = __VLS_86({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
    ...{ class: "mx-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
let __VLS_89;
let __VLS_90;
let __VLS_91;
const __VLS_92 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 800;
        __VLS_ctx.store.tableVertical = 150;
    }
};
__VLS_88.slots.default;
var __VLS_88;
const __VLS_93 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
}));
const __VLS_95 = __VLS_94({
    ...{ 'onClick': {} },
    size: "small",
    variant: "outlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_97;
let __VLS_98;
let __VLS_99;
const __VLS_100 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 1800;
    }
};
__VLS_96.slots.default;
var __VLS_96;
var __VLS_16;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['motion-card']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-height']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['motion-visualizer']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gantry-ring']} */ ;
/** @type {__VLS_StyleScopedClasses['gantry-tilt-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['table-v']} */ ;
/** @type {__VLS_StyleScopedClasses['table-top']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-positions']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            moveStep: moveStep,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MotionControl.vue.js.map