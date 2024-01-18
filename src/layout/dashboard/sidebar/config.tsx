import SvgColor from 'src/components/SvgColor';

const icon = (name: string) => <SvgColor src={`/assets/icons/sidebar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
