export default function SectionHeader({ 
  title, 
  subtitle, 
  align = "center", 
  className = "" 
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto"
  };

  return (
    <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="max-w-2xl text-base text-slate-600 leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}