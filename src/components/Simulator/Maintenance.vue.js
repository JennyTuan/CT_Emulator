/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Card, Steps, Button, List, Badge } from 'ant-design-vue';
import { Wrench, Clock } from 'lucide-vue-next';
import { useSimulatorStore } from '../../store/simulator';
import { ref, computed } from 'vue';
const store = useSimulatorStore();
const currentStep = ref(1);
const warmUpDescription = computed(() => {
    if (store.isWarmingUp)
        return `In Progress (${store.warmUpProgress}%)`;
    if (store.warmUpProgress === 100)
        return 'Completed';
    return 'Pending';
});
// 测试
const maintenanceTasks = [
    { title: 'System Calibration', status: 'success', lastRun: '2 hours ago' },
    { title: 'Tube Heat Load Check', status: 'warning', lastRun: '2 days ago' },
    { title: 'Detector Alignment', status: 'default', lastRun: '1 week ago' },
    { title: 'Gantry Balance Test', status: 'success', lastRun: '24 hours ago' },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "maintenance-card" },
    bordered: (false),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "maintenance-card" },
    bordered: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-title-container" },
    });
    const __VLS_5 = {}.Wrench;
    /** @type {[typeof __VLS_components.Wrench, ]} */ ;
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
    ...{ class: "maintenance-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "workflow-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "section-subtitle" },
});
const __VLS_9 = {}.Steps;
/** @type {[typeof __VLS_components.Steps, typeof __VLS_components.Steps, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    current: (__VLS_ctx.currentStep),
    size: "small",
    ...{ class: "custom-steps" },
}));
const __VLS_11 = __VLS_10({
    current: (__VLS_ctx.currentStep),
    size: "small",
    ...{ class: "custom-steps" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = ((__VLS_ctx.Steps.Step));
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    title: "Hardware Init",
    description: "Completed",
}));
const __VLS_15 = __VLS_14({
    title: "Hardware Init",
    description: "Completed",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_17 = ((__VLS_ctx.Steps.Step));
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    title: "Tube Warm-up",
    description: (__VLS_ctx.warmUpDescription),
}));
const __VLS_19 = __VLS_18({
    title: "Tube Warm-up",
    description: (__VLS_ctx.warmUpDescription),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const __VLS_21 = ((__VLS_ctx.Steps.Step));
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    title: "Air Cal",
    description: (__VLS_ctx.currentStep > 1 ? 'Completed' : 'Pending'),
}));
const __VLS_23 = __VLS_22({
    title: "Air Cal",
    description: (__VLS_ctx.currentStep > 1 ? 'Completed' : 'Pending'),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const __VLS_25 = ((__VLS_ctx.Steps.Step));
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    title: "Ready",
    description: (__VLS_ctx.currentStep === 3 ? 'Ready' : 'Pending'),
}));
const __VLS_27 = __VLS_26({
    title: "Ready",
    description: (__VLS_ctx.currentStep === 3 ? 'Ready' : 'Pending'),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-actions" },
});
const __VLS_29 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onClick: (...[$event]) => {
        __VLS_ctx.currentStep++;
    }
};
__VLS_32.slots.default;
var __VLS_32;
const __VLS_37 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    size: "small",
    ...{ style: {} },
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    size: "small",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onClick: (...[$event]) => {
        __VLS_ctx.currentStep = 0;
    }
};
__VLS_40.slots.default;
var __VLS_40;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tasks-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "section-subtitle" },
});
const __VLS_45 = {}.List;
/** @type {[typeof __VLS_components.List, typeof __VLS_components.List, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    dataSource: (__VLS_ctx.maintenanceTasks),
    size: "small",
}));
const __VLS_47 = __VLS_46({
    dataSource: (__VLS_ctx.maintenanceTasks),
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
{
    const { renderItem: __VLS_thisSlot } = __VLS_48.slots;
    const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_49 = ((__VLS_ctx.List.Item), (__VLS_ctx.List.Item));
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        ...{ class: "task-item" },
    }));
    const __VLS_51 = __VLS_50({
        ...{ class: "task-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "task-main" },
    });
    const __VLS_53 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        status: (item.status),
    }));
    const __VLS_55 = __VLS_54({
        status: (item.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "task-title" },
    });
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "task-meta" },
    });
    const __VLS_57 = {}.Clock;
    /** @type {[typeof __VLS_components.Clock, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        size: (12),
    }));
    const __VLS_59 = __VLS_58({
        size: (12),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.lastRun);
    const __VLS_61 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        type: "link",
        size: "small",
    }));
    const __VLS_63 = __VLS_62({
        type: "link",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_64.slots.default;
    var __VLS_64;
    var __VLS_52;
}
var __VLS_48;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logs-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "section-subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-viewport" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-entry info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-entry info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-entry warn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-entry info" },
});
if (__VLS_ctx.currentStep === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-entry error" },
    });
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['maintenance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['maintenance-content']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['tasks-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['task-item']} */ ;
/** @type {__VLS_StyleScopedClasses['task-main']} */ ;
/** @type {__VLS_StyleScopedClasses['task-title']} */ ;
/** @type {__VLS_StyleScopedClasses['task-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['logs-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['log-viewport']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['warn']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Card: Card,
            Steps: Steps,
            Button: Button,
            List: List,
            Badge: Badge,
            Wrench: Wrench,
            Clock: Clock,
            currentStep: currentStep,
            warmUpDescription: warmUpDescription,
            maintenanceTasks: maintenanceTasks,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Maintenance.vue.js.map