const DashboardIcon = '/dashboard.svg';

const Sidebar = () => {
  return (
    <div className='sidebar-width'>
      <div className='pointer-class'>
          <div className='center-icon-sidebar'>
            <img src={DashboardIcon} alt="DashboardIcon"/>
          </div>
          <span>
            Dashboard
          </span>
      </div>
    </div>
  );
};

export default Sidebar;