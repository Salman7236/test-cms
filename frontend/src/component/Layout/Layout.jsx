// src/component/Layout/Layout.js
import { Headers } from '../Header/Headers';
import Sidebar from '../Sidebar/Sidebar';

export const Layout = ({ children }) => {
  return (
    <>
      <Headers />
      <Sidebar>
        {children}
      </Sidebar>
    </>
  );
};