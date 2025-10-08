export default function HeadingSmall({ title, description }) {
    return (
        <header>
            <h3 className="mt-10 mb-0.5 text-base font-medium">{title}</h3>
            {description && <p className=" text-black text-sm">{description}</p>}
        </header>
    );
}
