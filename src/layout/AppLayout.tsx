import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      Sidebar
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
