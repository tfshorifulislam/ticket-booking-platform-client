import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export function RegistrationRole({value, onChange}) {
    return (
        <RadioGroup defaultValue="user" name={value}>
            <Label>Role</Label>
            <Description>Choose your role</Description>
            <div className="flex sm:gap-5 flex-col sm:flex-row">
                <Radio value="user" onChange={value}>
                    <Radio.Content>
                        <Radio.Control>
                            <Radio.Indicator />
                        </Radio.Control>
                        User
                    </Radio.Content>
                </Radio>
                <Radio value="vendor" >
                    <Radio.Content>
                        <Radio.Control>
                            <Radio.Indicator />
                        </Radio.Control>
                        Vendor
                    </Radio.Content>
                </Radio>
            </div>
        </RadioGroup>
    );
}