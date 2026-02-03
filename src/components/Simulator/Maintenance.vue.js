/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Card, Button, List, Badge, Tabs } from 'ant-design-vue';
import { Wrench, Clock } from 'lucide-vue-next';
import { useSimulatorStore } from '../../store/simulator';
import { ref } from 'vue';
import TubeWarmup from './TubeWarmup.vue';
import AirCalibration from './AirCalibration.vue';
const store = useSimulatorStore();
const activeKey = ref('warmup');
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
const __VLS_9 = {}.Tabs;
/** @type {[typeof __VLS_components.Tabs, typeof __VLS_components.Tabs, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    activeKey: (__VLS_ctx.activeKey),
    ...{ class: "custom-tabs" },
}));
const __VLS_11 = __VLS_10({
    activeKey: (__VLS_ctx.activeKey),
    ...{ class: "custom-tabs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = ((__VLS_ctx.Tabs.TabPane), (__VLS_ctx.Tabs.TabPane));
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    key: "warmup",
    tab: "球管预热",
}));
const __VLS_15 = __VLS_14({
    key: "warmup",
    tab: "球管预热",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
/** @type {[typeof TubeWarmup, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(TubeWarmup, new TubeWarmup({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
var __VLS_16;
const __VLS_20 = ((__VLS_ctx.Tabs.TabPane), (__VLS_ctx.Tabs.TabPane));
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    key: "aircal",
    tab: "空气校正",
}));
const __VLS_22 = __VLS_21({
    key: "aircal",
    tab: "空气校正",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
/** @type {[typeof AirCalibration, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(AirCalibration, new AirCalibration({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_23;
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tasks-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "section-subtitle" },
});
const __VLS_27 = {}.List;
/** @type {[typeof __VLS_components.List, typeof __VLS_components.List, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    dataSource: (__VLS_ctx.maintenanceTasks),
    size: "small",
}));
const __VLS_29 = __VLS_28({
    dataSource: (__VLS_ctx.maintenanceTasks),
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_30.slots.default;
{
    const { renderItem: __VLS_thisSlot } = __VLS_30.slots;
    const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_31 = ((__VLS_ctx.List.Item), (__VLS_ctx.List.Item));
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: "task-item" },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: "task-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_34.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "task-main" },
    });
    const __VLS_35 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        status: (item.status),
    }));
    const __VLS_37 = __VLS_36({
        status: (item.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "task-title" },
    });
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "task-meta" },
    });
    const __VLS_39 = {}.Clock;
    /** @type {[typeof __VLS_components.Clock, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
        size: (12),
    }));
    const __VLS_41 = __VLS_40({
        size: (12),
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.lastRun);
    const __VLS_43 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        type: "link",
        size: "small",
    }));
    const __VLS_45 = __VLS_44({
        type: "link",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    __VLS_46.slots.default;
    var __VLS_46;
    var __VLS_34;
}
var __VLS_30;
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
if (__VLS_ctx.store.eStopActive) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-entry error" },
    });
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['maintenance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['maintenance-content']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-section']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-tabs']} */ ;
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
            Button: Button,
            List: List,
            Badge: Badge,
            Tabs: Tabs,
            Wrench: Wrench,
            Clock: Clock,
            TubeWarmup: TubeWarmup,
            AirCalibration: AirCalibration,
            store: store,
            activeKey: activeKey,
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