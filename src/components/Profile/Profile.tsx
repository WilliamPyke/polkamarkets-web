import Icon from 'components/Icon';
import ProfileSignin from 'components/ProfileSignin';
import ProfileSignout from 'components/ProfileSignout';

import profileClasses from './Profile.module.scss';

type ProfileProps = {
  isLoggedIn: boolean;
};

export default function Profile({ isLoggedIn }: ProfileProps) {
  if (isLoggedIn) return <ProfileSignout />;
  return (
    <ProfileSignin variant="ghost" color="default">
      <Icon name="LogIn" size="lg" className={profileClasses.signinIcon} />
      Login
    </ProfileSignin>
  );
}
