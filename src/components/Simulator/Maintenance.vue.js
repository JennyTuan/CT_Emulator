/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
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
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['maintenance-content']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "maintenance-card" },
    variant: "flat",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "maintenance-card" },
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
    ...{ class: "maintenance-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "workflow-section" },
});
const __VLS_17 = {}.VTabs;
/** @type {[typeof __VLS_components.VTabs, typeof __VLS_components.vTabs, typeof __VLS_components.VTabs, typeof __VLS_components.vTabs, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    modelValue: (__VLS_ctx.activeKey),
    color: "primary",
    ...{ class: "custom-tabs-nav mb-4" },
}));
const __VLS_19 = __VLS_18({
    modelValue: (__VLS_ctx.activeKey),
    color: "primary",
    ...{ class: "custom-tabs-nav mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    value: "warmup",
}));
const __VLS_23 = __VLS_22({
    value: "warmup",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
var __VLS_24;
const __VLS_25 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    value: "aircal",
}));
const __VLS_27 = __VLS_26({
    value: "aircal",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
var __VLS_28;
var __VLS_20;
const __VLS_29 = {}.VTabsWindow;
/** @type {[typeof __VLS_components.VTabsWindow, typeof __VLS_components.vTabsWindow, typeof __VLS_components.VTabsWindow, typeof __VLS_components.vTabsWindow, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.activeKey),
    ...{ class: "custom-tabs-content" },
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.activeKey),
    ...{ class: "custom-tabs-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.VTabsWindowItem;
/** @type {[typeof __VLS_components.VTabsWindowItem, typeof __VLS_components.vTabsWindowItem, typeof __VLS_components.VTabsWindowItem, typeof __VLS_components.vTabsWindowItem, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    value: "warmup",
}));
const __VLS_35 = __VLS_34({
    value: "warmup",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
/** @type {[typeof TubeWarmup, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(TubeWarmup, new TubeWarmup({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_36;
const __VLS_40 = {}.VTabsWindowItem;
/** @type {[typeof __VLS_components.VTabsWindowItem, typeof __VLS_components.vTabsWindowItem, typeof __VLS_components.VTabsWindowItem, typeof __VLS_components.vTabsWindowItem, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    value: "aircal",
}));
const __VLS_42 = __VLS_41({
    value: "aircal",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
/** @type {[typeof AirCalibration, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(AirCalibration, new AirCalibration({}));
const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
var __VLS_43;
var __VLS_32;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tasks-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "section-subtitle" },
});
const __VLS_47 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    density: "compact",
    ...{ class: "transparent" },
}));
const __VLS_49 = __VLS_48({
    density: "compact",
    ...{ class: "transparent" },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.maintenanceTasks))) {
    const __VLS_51 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        key: (index),
        ...{ class: "task-item px-0" },
    }));
    const __VLS_53 = __VLS_52({
        key: (index),
        ...{ class: "task-item px-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_54.slots.default;
    {
        const { prepend: __VLS_thisSlot } = __VLS_54.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "dot mr-2" },
            ...{ class: (item.status === 'success' ? 'success' : (item.status === 'warning' ? 'warning' : 'grey')) },
        });
    }
    const __VLS_55 = {}.VListItemTitle;
    /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        ...{ class: "task-title" },
    }));
    const __VLS_57 = __VLS_56({
        ...{ class: "task-title" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_58.slots.default;
    (item.title);
    var __VLS_58;
    {
        const { append: __VLS_thisSlot } = __VLS_54.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "task-meta d-flex align-center" },
        });
        const __VLS_59 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
            size: "x-small",
            ...{ class: "mr-1" },
        }));
        const __VLS_61 = __VLS_60({
            size: "x-small",
            ...{ class: "mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        __VLS_62.slots.default;
        var __VLS_62;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "mr-2" },
        });
        (item.lastRun);
        const __VLS_63 = {}.VBtn;
        /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
            variant: "text",
            size: "x-small",
            color: "primary",
        }));
        const __VLS_65 = __VLS_64({
            variant: "text",
            size: "x-small",
            color: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        __VLS_66.slots.default;
        var __VLS_66;
    }
    var __VLS_54;
}
var __VLS_50;
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
var __VLS_16;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['maintenance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['maintenance-content']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-section']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-tabs-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-tabs-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tasks-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['task-item']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['task-title']} */ ;
/** @type {__VLS_StyleScopedClasses['task-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
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