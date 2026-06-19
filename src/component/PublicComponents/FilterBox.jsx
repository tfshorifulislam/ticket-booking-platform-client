import { Description, ListBox, Select } from "@heroui/react";

export function FilterBox({ value, onChange }) {
    return (
        <Select
            selectedKey={value}
            onSelectionChange={(key) => onChange(key)}
            className="rounded-xl px-3 py-2" placeholder="Select one">
            <Select.Trigger className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:border-green-400 focus:ring-2 focus:ring-green-500 transition">
                <Select.Value className="text-gray-700" />
                <Select.Indicator className="text-gray-400" />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    <ListBox.Item id="all" textValue="all">
                        All Transport
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Bus" textValue="Bus">
                        Bus
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Train" textValue="Train">
                        Train
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Flight" textValue="Flight">
                        Flight
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    );
}