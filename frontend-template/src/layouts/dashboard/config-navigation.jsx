import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = (admin) => {
  const navi = [
    {
      title: 'user dashboard',
      path: '/',
      icon: icon('ic_user'),
    },
    // {
    //   title: 'product',
    //   path: '/products',
    //   icon: icon('ic_cart'),
    // },
    // {
    //   title: 'login',
    //   path: '/login',
    //   icon: icon('ic_lock'),
    // },
    // {
    //   title: 'Not found',
    //   path: '/404',
    //   icon: icon('ic_disabled'),
    // },
  ];
  if (admin) {
    navi.unshift({
      title: 'message',
      path: '/message',
      icon: icon('ic_message'),
    });
    navi.unshift({
      title: 'admin dashboard',
      path: '/admin',
      icon: icon('ic_analytics'),
    });
  }
  return navi;
};

export default navConfig;
