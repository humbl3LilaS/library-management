import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerProps = {
    value: string;
    onChange: (value: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    return (
        <div className={"relative flex gap-x-4"}>
            <div className={"h-full flex items-center "}>
                <p>#</p>
                <HexColorInput color={value} onChange={onChange} />
            </div>
            <HexColorPicker color={value} onChange={onChange} className={"flex-1"} />
        </div>
    );
};

export default ColorPicker;
