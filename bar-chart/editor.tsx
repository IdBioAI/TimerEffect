import {type PluginDefinition, createSchemaBuilder, InspectorTabs} from '@alfons-app/pdk';
import {name} from './package.json';
import type Zod from 'zod';
import {ChartMultipleRegular} from "@fluentui/react-icons";
import BarChartValuesControl from "./control/BarChartControl";

const $ = createSchemaBuilder(name);

const BarChartItemSchema = $.object({
    value: $.number().finite().setupInspector({
        control: 'Numeric',
    }),
    label: $.string().setupInspector({
        control: 'Text',
    }),

    color: $.string().optional().describe(
        'column color'
    ),
});

const Definition = {
    Icon: () => <ChartMultipleRegular/>,
    controls: {BarChartValuesControl},
    schema: $.object({
        dataset: $.array(BarChartItemSchema)
            .setupInspector(
                {
                    control: '@jaroslav-vondrak/bar-chart:BarChartValuesControl',
                    tab: 'DataArea20Filled',
                    category: 'Data',
                }
            )
            .default([]),
        axisX: $.string()
            .setupInspector({
                control: "Text",
                category: "Chart Settings",
            })
            .default('X Axis Label'),

        axisY: $.string()
            .setupInspector({
                control: "Text",
                category: "Chart Settings",
            })
            .default('Y Axis Label'),

        width: $.number()
            .setupInspector({
                control: "Numeric",
                category: "Chart Settings",
            })
            .default(350),

        height: $.number()
            .setupInspector({
                control: "Numeric",
                category: "Chart Settings",
            })
            .default(200),

        textRotate: $.boolean()
            .setupInspector({
                control: "Switch",
                category: "Chart Settings",
            })
            .default(false),

    }),
    shouldAllowChild: () => () => false,
} satisfies PluginDefinition;

export default Definition;

export type Props = Zod.infer<typeof Definition.schema>;

