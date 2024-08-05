import { Helmet } from 'react-helmet-async';

import { UserDashboardView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function UserDashboardPage() {
  return (
    <>
      <Helmet>
        <title> User Dashboard | CyberSecurity </title>
      </Helmet>

      <UserDashboardView />
    </>
  );
}
