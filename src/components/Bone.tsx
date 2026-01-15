import './Bone.css';

interface BoneProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
}

export default function Bone({ className = '', width, height, borderRadius = '12px' }: BoneProps) {
    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
        borderRadius,
    };

    return (
        <div
            className={`relative overflow-hidden bg-slate-100 ${className}`}
            style={style}
        >
            <div className="bone-shimmer"></div>
        </div>
    );
}
