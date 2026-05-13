"use client";

import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    const [toaster] = useState(() => <Toaster position="top-center" />);

    return toaster;
}
