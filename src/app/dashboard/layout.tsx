import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardLayout = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/auth');
  }

  if (session.user.role !== 'Moderator') {
    return redirect('/app');
  }

  return <div>DashboardLayout</div>;
};

export default DashboardLayout;
