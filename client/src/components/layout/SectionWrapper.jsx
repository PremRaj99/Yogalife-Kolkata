// src/components/layout/SectionWrapper.jsx
export default function SectionWrapper({ title, subtitle, children, className = "" }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl mx-auto text-base text-slate-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}