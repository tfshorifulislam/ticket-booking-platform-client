import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export function RegistrationRole() {
    return (
        <RadioGroup defaultValue="premium" name="plan">
            <Label>Role</Label>
            <Description>Choose your role</Description>
            <div className="flex sm:gap-5 flex-col sm:flex-row">
                <Radio value="basic">
                    <Radio.Content>
                        <Radio.Control>
                            <Radio.Indicator />
                        </Radio.Control>
                        User
                    </Radio.Content>
                </Radio>
                <Radio value="premium">
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