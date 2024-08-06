import { Helmet } from 'react-helmet-async';

import { MessageView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function MessagePage() {
  return (
    <>
      <Helmet>
        <title> Message | CyberEscape </title>
      </Helmet>

      <MessageView />
    </>
  );
}
