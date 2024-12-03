import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import Preference from "../components/user/Preference.jsx";
import UpdatePassword from "../components/user/UpdatePassword.jsx";
import Account from "../components/user/Account.jsx";

const ProfilePage = () => {
  return (
    <>
      <div className="mx-16">
        <Tabs activeTab={0} className="mt-6" activityClassName="bg-success">
          <Tab
            title="Account"
            className="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <Account />
          </Tab>
          <Tab
            title="Preferences"
            className="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <Preference />
          </Tab>
          <Tab
            title="Update Password"
            className="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <UpdatePassword />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
