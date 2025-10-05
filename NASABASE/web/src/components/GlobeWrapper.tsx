import React, { useEffect, useRef, useState } from "react";

const GlobeWrapper = (props: any) => {
  const [GlobeComponent, setGlobeComponent] = useState<any>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadGlobe = async () => {
      try {
        // ✅ Import only in browser
        if (typeof window === "undefined") return;
        const mod = await import("react-globe.gl");
        if (isMounted) setGlobeComponent(() => mod.default);
      } catch (err) {
        console.error("Error loading Globe:", err);
      }
    };

    loadGlobe();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!GlobeComponent) {
    // Loading fallback while module initializes
    return (
      <div
        style={{
          width: props.width || 400,
          height: props.height || 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #001220, #000)",
          boxShadow: "0 0 30px rgba(0,255,255,0.3)",
        }}
      />
    );
  }

  return <GlobeComponent ref={globeRef} {...props} />;
};

export default GlobeWrapper;
