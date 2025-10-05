import React, { useEffect, useState } from "react";

const SafeGlobe = (props: any) => {
  const [Globe, setGlobe] = useState<any>(null);

  useEffect(() => {
    // Delay mount until client + next tick
    const timer = setTimeout(() => {
      import("react-globe.gl")
        .then((mod) => setGlobe(() => mod.default))
        .catch((err) => console.error("Globe load failed:", err));
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  if (!Globe) return <div style={{ height: 380, width: 380 }} />; // placeholder

  return <Globe {...props} />;
};

export default SafeGlobe;
