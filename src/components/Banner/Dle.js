import React, { useState } from "react";

function Dle() {
  const [loading, setLoading] = useState(true);
  return <>{!loading ? <div>loading</div> : <div>salomi</div>}</>;
}

export default Dle;
