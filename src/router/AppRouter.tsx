import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { DashboardView } from '@/views/pages/dashboard';
import { About } from '@/views/home/About';
import { Contact } from '@/views/home/Contact';
import { Banner } from '@/views/home/Banner';
import { TournamentHome } from '@/views/home/tournaments/TournamentHome';
import { NotFound } from '@/views/home/NotFound';
import { Tournament } from '@/views/home/tournaments/Tournament';
export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    (status === 'not-authenticated') ?
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tournaments' element={<TournamentHome />} />
        <Route path='/tournament/:gameName' element={<Tournament />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      :
      <Layout>
        <Routes>
          <Route path='/dashboardView' element={<DashboardView />} />

          {/*  */}
          <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
        </Routes>
      </Layout>
  )
}
