/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useSimulatorStore } from '../../store/simulator';
import { Card, Button, Progress, Table, Tag } from 'ant-design-vue';
import { Play, Square, Pause, Scan } from 'lucide-vue-next';
import { computed, h } from 'vue';
const store = useSimulatorStore();
const progressPercent = computed(() => {
    return Math.round((store.currentSlice / store.totalSlices) * 100);
});
const scanStatusColor = computed(() => {
    switch (store.scanStatus) {
        case 'scanning': return '#52c41a';
        case 'error': return '#f5222d';
        case 'ready': return '#1890ff';
        default: return '#666';
    }
});
const historyData = [
    { key: '1', time: '10:45:12', protocol: 'Chest Routine', dose: '12.4 mGy', status: 'Completed' },
    { key: '2', time: '10:30:45', protocol: 'Head Non-Contrast', dose: '45.2 mGy', status: 'Completed' },
    { key: '3', time: '10:15:22', protocol: 'Abdomen/Pelvis', dose: '18.1 mGy', status: 'Cancelled' },
];
const columns = [
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Protocol', dataIndex: 'protocol', key: 'protocol' },
    { title: 'Dose (CTDIvol)', dataIndex: 'dose', key: 'dose' },
    { title: 'Status', dataIndex: 'status', key: 'status', customRender: ({ text }) => {
            let color = text === 'Completed' ? 'green' : 'red';
            return h(Tag, { color: color }, { default: () => text });
        } },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['scan-visualizer']} */ ;
/** @type {__VLS_StyleScopedClasses['slice-counter']} */ ;
/** @type {__VLS_StyleScopedClasses['slice-counter']} */ ;
/** @type {__VLS_StyleScopedClasses['slice-counter']} */ ;
/** @type {__VLS_StyleScopedClasses['status-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['status-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['ant-table-tbody']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "scan-card" },
    bordered: (false),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "scan-card" },
    bordered: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-title-container" },
    });
    const __VLS_5 = {}.Scan;
    /** @type {[typeof __VLS_components.Scan, ]} */ ;
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
    ...{ class: "scan-main" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-visualizer" },
    ...{ class: ({ 'is-scanning': __VLS_ctx.store.exposureActive }) },
});
if (__VLS_ctx.store.exposureActive) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "exposure-indicator" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slice-counter" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "current" },
});
(__VLS_ctx.store.currentSlice);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "separator" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "total" },
});
(__VLS_ctx.store.totalSlices);
const __VLS_9 = {}.Progress;
/** @type {[typeof __VLS_components.Progress, typeof __VLS_components.Progress, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    type: "circle",
    percent: (__VLS_ctx.progressPercent),
    strokeColor: (__VLS_ctx.scanStatusColor),
    width: (180),
    strokeWidth: (8),
}));
const __VLS_11 = __VLS_10({
    type: "circle",
    percent: (__VLS_ctx.progressPercent),
    strokeColor: (__VLS_ctx.scanStatusColor),
    width: (180),
    strokeWidth: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
{
    const { format: __VLS_thisSlot } = __VLS_12.slots;
    const [percent] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "progress-percent" },
    });
    (percent);
}
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-banner" },
    ...{ style: ({ borderLeftColor: __VLS_ctx.scanStatusColor }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
(__VLS_ctx.store.scanStatus.toUpperCase());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-buttons" },
});
const __VLS_13 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    disabled: (__VLS_ctx.store.scanStatus === 'scanning' || __VLS_ctx.store.eStopActive),
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    disabled: (__VLS_ctx.store.scanStatus === 'scanning' || __VLS_ctx.store.eStopActive),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onClick: (__VLS_ctx.store.startScan)
};
__VLS_16.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_16.slots;
    const __VLS_21 = {}.Play;
    /** @type {[typeof __VLS_components.Play, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        size: (18),
    }));
    const __VLS_23 = __VLS_22({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
}
var __VLS_16;
const __VLS_25 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    size: "large",
    disabled: (__VLS_ctx.store.scanStatus !== 'scanning'),
}));
const __VLS_27 = __VLS_26({
    size: "large",
    disabled: (__VLS_ctx.store.scanStatus !== 'scanning'),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_28.slots;
    const __VLS_29 = {}.Pause;
    /** @type {[typeof __VLS_components.Pause, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        size: (18),
    }));
    const __VLS_31 = __VLS_30({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
}
var __VLS_28;
const __VLS_33 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ 'onClick': {} },
    danger: true,
    size: "large",
}));
const __VLS_35 = __VLS_34({
    ...{ 'onClick': {} },
    danger: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_37;
let __VLS_38;
let __VLS_39;
const __VLS_40 = {
    onClick: (__VLS_ctx.store.triggerEStop)
};
__VLS_36.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_36.slots;
    const __VLS_41 = {}.Square;
    /** @type {[typeof __VLS_components.Square, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        size: (18),
    }));
    const __VLS_43 = __VLS_42({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
}
var __VLS_36;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-params" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "param-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-history" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "history-title" },
});
const __VLS_45 = {}.Table;
/** @type {[typeof __VLS_components.Table, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    dataSource: (__VLS_ctx.historyData),
    columns: (__VLS_ctx.columns),
    size: "small",
    pagination: (false),
}));
const __VLS_47 = __VLS_46({
    dataSource: (__VLS_ctx.historyData),
    columns: (__VLS_ctx.columns),
    size: "small",
    pagination: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['scan-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-main']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-visualizer']} */ ;
/** @type {__VLS_StyleScopedClasses['exposure-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['slice-counter']} */ ;
/** @type {__VLS_StyleScopedClasses['current']} */ ;
/** @type {__VLS_StyleScopedClasses['separator']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-percent']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['status-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-params']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['param-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-history']} */ ;
/** @type {__VLS_StyleScopedClasses['history-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Card: Card,
            Button: Button,
            Progress: Progress,
            Table: Table,
            Play: Play,
            Square: Square,
            Pause: Pause,
            Scan: Scan,
            store: store,
            progressPercent: progressPercent,
            scanStatusColor: scanStatusColor,
            historyData: historyData,
            columns: columns,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ScanStatus.vue.js.map