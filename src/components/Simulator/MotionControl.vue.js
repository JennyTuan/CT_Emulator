/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { Card, Button, Slider, Space } from 'ant-design-vue';
import { ChevronUp, ChevronDown, Compass, ChevronLeft, ChevronRight } from 'lucide-vue-next';
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
const __VLS_0 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "motion-card" },
    bordered: (false),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "motion-card" },
    bordered: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-title-container" },
    });
    const __VLS_5 = {}.Compass;
    /** @type {[typeof __VLS_components.Compass, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        size: (20),
    }));
    const __VLS_7 = __VLS_6({
        size: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
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
const __VLS_9 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_11 = __VLS_10({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('gantry', -1);
    }
};
__VLS_12.slots.default;
const __VLS_17 = {}.ChevronLeft;
/** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    size: (14),
}));
const __VLS_19 = __VLS_18({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
var __VLS_12;
const __VLS_21 = {}.Slider;
/** @type {[typeof __VLS_components.Slider, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    value: (__VLS_ctx.store.gantryPosition),
    min: (-30),
    max: (30),
    step: (0.5),
    ...{ class: "axis-slider" },
}));
const __VLS_23 = __VLS_22({
    value: (__VLS_ctx.store.gantryPosition),
    min: (-30),
    max: (30),
    step: (0.5),
    ...{ class: "axis-slider" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const __VLS_25 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_27 = __VLS_26({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_29;
let __VLS_30;
let __VLS_31;
const __VLS_32 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('gantry', 1);
    }
};
__VLS_28.slots.default;
const __VLS_33 = {}.ChevronRight;
/** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    size: (14),
}));
const __VLS_35 = __VLS_34({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_28;
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
const __VLS_37 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
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
__VLS_40.slots.default;
const __VLS_45 = {}.ChevronDown;
/** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    size: (14),
}));
const __VLS_47 = __VLS_46({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
var __VLS_40;
const __VLS_49 = {}.Slider;
/** @type {[typeof __VLS_components.Slider, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    value: (__VLS_ctx.store.tableVertical),
    min: (0),
    max: (300),
    ...{ class: "axis-slider" },
}));
const __VLS_51 = __VLS_50({
    value: (__VLS_ctx.store.tableVertical),
    min: (0),
    max: (300),
    ...{ class: "axis-slider" },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const __VLS_53 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
let __VLS_59;
const __VLS_60 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('v', 5);
    }
};
__VLS_56.slots.default;
const __VLS_61 = {}.ChevronUp;
/** @type {[typeof __VLS_components.ChevronUp, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    size: (14),
}));
const __VLS_63 = __VLS_62({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
var __VLS_56;
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
const __VLS_65 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
let __VLS_71;
const __VLS_72 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('h', -10);
    }
};
__VLS_68.slots.default;
const __VLS_73 = {}.ChevronDown;
/** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    size: (14),
}));
const __VLS_75 = __VLS_74({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
var __VLS_68;
const __VLS_77 = {}.Slider;
/** @type {[typeof __VLS_components.Slider, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    value: (__VLS_ctx.store.tableHorizontal),
    min: (0),
    max: (2000),
    ...{ class: "axis-slider" },
}));
const __VLS_79 = __VLS_78({
    value: (__VLS_ctx.store.tableHorizontal),
    min: (0),
    max: (2000),
    ...{ class: "axis-slider" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const __VLS_81 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_85;
let __VLS_86;
let __VLS_87;
const __VLS_88 = {
    onClick: (...[$event]) => {
        __VLS_ctx.moveStep('h', 10);
    }
};
__VLS_84.slots.default;
const __VLS_89 = {}.ChevronUp;
/** @type {[typeof __VLS_components.ChevronUp, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    size: (14),
}));
const __VLS_91 = __VLS_90({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
var __VLS_84;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "motion-visualizer" },
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
    ...{ class: "quick-positions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
const __VLS_93 = {}.Space;
/** @type {[typeof __VLS_components.Space, typeof __VLS_components.Space, ]} */ ;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({}));
const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
__VLS_96.slots.default;
const __VLS_97 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_99 = __VLS_98({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
let __VLS_101;
let __VLS_102;
let __VLS_103;
const __VLS_104 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 0;
        __VLS_ctx.store.tableVertical = 150;
    }
};
__VLS_100.slots.default;
var __VLS_100;
const __VLS_105 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_107 = __VLS_106({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
let __VLS_109;
let __VLS_110;
let __VLS_111;
const __VLS_112 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 800;
        __VLS_ctx.store.tableVertical = 150;
    }
};
__VLS_108.slots.default;
var __VLS_108;
const __VLS_113 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_115 = __VLS_114({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
let __VLS_117;
let __VLS_118;
let __VLS_119;
const __VLS_120 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.tableHorizontal = 1800;
    }
};
__VLS_116.slots.default;
var __VLS_116;
var __VLS_96;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['motion-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-group']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-header']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-name']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-value']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['axis-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['motion-visualizer']} */ ;
/** @type {__VLS_StyleScopedClasses['gantry-ring']} */ ;
/** @type {__VLS_StyleScopedClasses['gantry-tilt-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['table-v']} */ ;
/** @type {__VLS_StyleScopedClasses['table-top']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-positions']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Card: Card,
            Button: Button,
            Slider: Slider,
            Space: Space,
            ChevronUp: ChevronUp,
            ChevronDown: ChevronDown,
            Compass: Compass,
            ChevronLeft: ChevronLeft,
            ChevronRight: ChevronRight,
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