import { type AlfonsControl } from '@alfons-app/pdk';
import type { barDataItem as TBarDataItem } from 'react-native-gifted-charts';
import { useFieldArray, Controller } from 'react-hook-form';
import { Add20Filled, Delete20Filled } from '@fluentui/react-icons';

const BarChartValuesControl: AlfonsControl<TBarDataItem> = ({ fieldProps }) => {

    const { control, name } = fieldProps;
    const { fields, append, remove } = useFieldArray({ control, name });

    const handleAppend = () => {
        append({ value: 0, label: 'text', color: '#4285F4' });
    };

    const handleRemove = (index: number) => {
        remove(index);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2">
                        <Controller
                            control={control}
                            name={`${name}.${index}.label`}
                            render={({ field: labelField }) => (
                                <input
                                    {...labelField}
                                    placeholder="Label"
                                    className="px-2 py-1 border rounded flex-1"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={`${name}.${index}.value`}
                            render={({ field: valueField }) => (
                                <input
                                    {...valueField}
                                    type="number"
                                    placeholder="Value"
                                    className="px-2 py-1 border rounded w-20"
                                    onChange={(e) => valueField.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                        <div className="flex flex-row gap-2">
                            <Controller
                                control={control}
                                name={`${name}.${index}.color`}
                                render={({ field: colorField }) => (
                                    <input
                                        {...colorField}
                                        type="color"
                                        className="w-10 h-8 border rounded"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                                title="Remove item"
                            >
                                <Delete20Filled />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleAppend}
            >
                <Add20Filled />
                Add Item
            </button>
        </div>
    );
};
export default BarChartValuesControl;