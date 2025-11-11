import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AboutSection from './components/sections/AboutSection';
import EducationSection from './components/sections/EducationSection';
import AchievementsSection from './components/sections/AchievementsSection';
import SkillsSection from './components/sections/SkillsSection';
import VolunteerSection from './components/sections/VolunteerSection';
import GallerySection from './components/sections/GallerySection';
import JourneySection from './components/sections/JourneySection';
import AdminLogin from './components/AdminLogin';
import usePortfolioData from './hooks/usePortfolioData';
import type { PortfolioData } from './types';

const App: React.FC = () => {
  const { data, updateData, isLoaded } = usePortfolioData();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-800">
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  const handleUpdate = (section: keyof PortfolioData, value: any) => {
    updateData({ ...data, [section]: value });
  };

  return (
    <div className="bg-slate-50 text-slate-800">
      <Header 
        isAdmin={isAdmin}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={() => setIsAdmin(false)}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <AboutSection 
          isAdmin={isAdmin}
          data={data.about}
          onUpdate={(value) => handleUpdate('about', value)}
        />
        <EducationSection 
          isAdmin={isAdmin}
          data={data.education}
          onUpdate={(value) => handleUpdate('education', value)}
        />
        <AchievementsSection 
          isAdmin={isAdmin}
          data={data.achievements}
          onUpdate={(value) => handleUpdate('achievements', value)}
        />
        <SkillsSection 
          isAdmin={isAdmin}
          data={data.skills}
          onUpdate={(value) => handleUpdate('skills', value)}
        />
        <VolunteerSection 
          isAdmin={isAdmin}
          data={data.volunteer}
          onUpdate={(value) => handleUpdate('volunteer', value)}
        />
        <GallerySection 
          isAdmin={isAdmin}
          data={data.gallery}
          onUpdate={(value) => handleUpdate('gallery', value)}
        />
        <JourneySection
          isAdmin={isAdmin}
          data={data.journey}
          onUpdate={(value) => handleUpdate('journey', value)}
        />
      </main>
      {showLogin && (
        <AdminLogin 
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setIsAdmin(true);
            setShowLogin(false);
          }}
        />
      )}
      <footer className="text-center py-6 bg-slate-900 text-slate-200 mt-12">
        <p>&copy; {new Date().getFullYear()} ملف إنجاز حمزه سلطان شطا. كل الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default App;