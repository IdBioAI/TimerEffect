import {type PluginDefinition, createSchemaBuilder} from '@alfons-app/pdk';
import {name} from './package.json';
import type Zod from 'zod';
import {TimerRegular} from "@fluentui/react-icons";

const $ = createSchemaBuilder(name);

const Definition = {
    Icon: () => <TimerRegular/>,
    schema: $.object({

        interval: $.number()
            .setupInspector({
                control: "Numeric",
                category: "Timer Settings",
            })
            .default(1000),

        unit: $.enum(['milliseconds', 'seconds'] as const)
            .setupInspector({
                control: "Select",
                category: "Timer Settings",
            })
            .default('milliseconds'),

        repeat: $.boolean()
            .setupInspector({
                control: "Switch",
                category: "Timer Settings",
            })
            .default(false),

        onInterval: $.reference()
            .setupInspector({
                category: "Actions",
                sourcing: "reference",
            }),

        timeState: $.reference()
            .setupInspector({
                category: "Actions",
                sourcing: "reference",
            }),

        titleBtnReset: $.string().default('Reset button title').setupInspector({}),
        titleBtnToggle: $.string().default('stop/start button title').setupInspector({})
    }),
    shouldAllowChild: () => () => false,
} satisfies PluginDefinition;

export default Definition;

export type Props = Zod.infer<typeof Definition.schema>;
