import { createContext, useState } from "react";

export const drawerContext = createContext();

export default function DrawerProvider(props) {
    // drawer responiveness
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

  // authContext will expose these items
  const drawer = { mobileOpen, setMobileOpen, handleDrawerToggle };

  return (
    <drawerContext.Provider value={drawer}>
      {props.children}
    </drawerContext.Provider>
  );
}
