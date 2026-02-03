/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { Button, Progress, Tag, Divider } from 'ant-design-vue';
import { Zap, ShieldAlert, Thermometer, Wind, Radio, Settings, Activity } from 'lucide-vue-next';
const store = useSimulatorStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-card" },
    ...{ class: ({ 'active': __VLS_ctx.store.laserOn }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-icon" },
});
const __VLS_0 = {}.Zap;
/** @type {[typeof __VLS_components.Zap, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (20),
    color: (__VLS_ctx.store.laserOn ? '#faad14' : '#666'),
}));
const __VLS_2 = __VLS_1({
    size: (20),
    color: (__VLS_ctx.store.laserOn ? '#faad14' : '#666'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
(__VLS_ctx.store.laserOn ? 'ON' : 'OFF');
const __VLS_4 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    size: "small",
    type: (__VLS_ctx.store.laserOn ? 'primary' : 'default'),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    size: "small",
    type: (__VLS_ctx.store.laserOn ? 'primary' : 'default'),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.store.toggleLaser)
};
__VLS_7.slots.default;
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-card" },
    ...{ class: ({ 'warning': __VLS_ctx.store.eStopActive }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-icon" },
});
const __VLS_12 = {}.ShieldAlert;
/** @type {[typeof __VLS_components.ShieldAlert, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    size: (20),
    color: (__VLS_ctx.store.eStopActive ? '#f5222d' : '#666'),
}));
const __VLS_14 = __VLS_13({
    size: (20),
    color: (__VLS_ctx.store.eStopActive ? '#f5222d' : '#666'),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
const __VLS_16 = {}.Tag;
/** @type {[typeof __VLS_components.Tag, typeof __VLS_components.Tag, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    color: (__VLS_ctx.store.eStopActive ? 'red' : 'green'),
}));
const __VLS_18 = __VLS_17({
    color: (__VLS_ctx.store.eStopActive ? 'red' : 'green'),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
(__VLS_ctx.store.eStopActive ? 'TRIGGERED' : 'NORMAL');
var __VLS_19;
if (__VLS_ctx.store.eStopActive) {
    const __VLS_20 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        size: "small",
        danger: true,
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        size: "small",
        danger: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (__VLS_ctx.store.resetEStop)
    };
    __VLS_23.slots.default;
    var __VLS_23;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-icon" },
});
const __VLS_28 = {}.Thermometer;
/** @type {[typeof __VLS_components.Thermometer, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    size: (20),
    color: "#1890ff",
}));
const __VLS_30 = __VLS_29({
    size: (20),
    color: "#1890ff",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
const __VLS_32 = {}.Progress;
/** @type {[typeof __VLS_components.Progress, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    percent: (__VLS_ctx.store.warmUpProgress),
    size: "small",
    status: (__VLS_ctx.store.isWarmingUp ? 'active' : 'normal'),
}));
const __VLS_34 = __VLS_33({
    percent: (__VLS_ctx.store.warmUpProgress),
    size: "small",
    status: (__VLS_ctx.store.isWarmingUp ? 'active' : 'normal'),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.store.isWarmingUp || __VLS_ctx.store.warmUpProgress === 100),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.store.isWarmingUp || __VLS_ctx.store.warmUpProgress === 100),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.store.startWarmUp)
};
__VLS_39.slots.default;
var __VLS_39;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-icon" },
});
const __VLS_44 = {}.Wind;
/** @type {[typeof __VLS_components.Wind, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    size: (20),
    color: "#52c41a",
}));
const __VLS_46 = __VLS_45({
    size: (20),
    color: "#52c41a",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
const __VLS_48 = {}.Progress;
/** @type {[typeof __VLS_components.Progress, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    percent: (__VLS_ctx.store.airCalProgress),
    size: "small",
    status: (__VLS_ctx.store.isAirCalibrating ? 'active' : 'normal'),
    strokeColor: "#52c41a",
}));
const __VLS_50 = __VLS_49({
    percent: (__VLS_ctx.store.airCalProgress),
    size: "small",
    status: (__VLS_ctx.store.isAirCalibrating ? 'active' : 'normal'),
    strokeColor: "#52c41a",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const __VLS_52 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.store.isAirCalibrating || __VLS_ctx.store.airCalProgress === 100),
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.store.isAirCalibrating || __VLS_ctx.store.airCalProgress === 100),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onClick: (__VLS_ctx.store.startAirCal)
};
__VLS_55.slots.default;
var __VLS_55;
const __VLS_60 = {}.Divider;
/** @type {[typeof __VLS_components.Divider, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ style: {} },
}));
const __VLS_62 = __VLS_61({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-item active" },
});
const __VLS_64 = {}.Activity;
/** @type {[typeof __VLS_components.Activity, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    size: (18),
}));
const __VLS_66 = __VLS_65({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-item" },
});
const __VLS_68 = {}.Radio;
/** @type {[typeof __VLS_components.Radio, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    size: (18),
}));
const __VLS_70 = __VLS_69({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-item" },
});
const __VLS_72 = {}.Settings;
/** @type {[typeof __VLS_components.Settings, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    size: (18),
}));
const __VLS_74 = __VLS_73({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "uptime" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "version" },
});
/** @type {__VLS_StyleScopedClasses['sidebar-content']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-card']} */ ;
/** @type {__VLS_StyleScopedClasses['status-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['uptime']} */ ;
/** @type {__VLS_StyleScopedClasses['version']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            Progress: Progress,
            Tag: Tag,
            Divider: Divider,
            Zap: Zap,
            ShieldAlert: ShieldAlert,
            Thermometer: Thermometer,
            Wind: Wind,
            Radio: Radio,
            Settings: Settings,
            Activity: Activity,
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
//# sourceMappingURL=Sidebar.vue.js.map