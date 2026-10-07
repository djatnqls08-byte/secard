import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, Library, PenTool, User, 
  ArrowLeft, Download, Image as ImageIcon,
  Heart, Play, ChevronRight, FileText, HelpCircle, Moon, Sun
} from 'lucide-react';

const MOCK_TEMPLATES = {
  recommended: [
    { id: 'r1', category: '추리', title: '수몰된 밀실', author: '공식 에디터', likes: 128, plays: 22, color: 'from-cyan-900 to-blue-900', isNew: true },
    { id: 'r2', category: '연애', title: '어느 세이렌의 결백', author: '공식 에디터', likes: 85, plays: 14, color: 'from-fuchsia-900 to-purple-900', isNew: false },
    { id: 'r3', category: '호러', title: '블랙 X 리스트', author: '유저 크리에이터', likes: 42, plays: 7, color: 'from-red-900 to-stone-900', isNew: true },
  ],
  official: [
    { id: 'o1', category: '미스터리', title: '재로 덮인 요람', author: '공식 에디터', likes: 300, plays: 92, color: 'from-stone-800 to-stone-950', isNew: false },
    { id: 'o2', category: '추리', title: '시간의 톱니바퀴', author: '공식 에디터', likes: 210, plays: 45, color: 'from-amber-900 to-orange-950', isNew: false },
  ],
  new: [
    { id: 'n1', category: '괴담', title: '물때가 지나간 자리', author: '인디 작가', likes: 12, plays: 3, color: 'from-teal-900 to-emerald-950', isNew: true },
    { id: 'n2', category: 'SF', title: '오프 더 레코드', author: '신예 크리에이터', likes: 8, plays: 1, color: 'from-indigo-900 to-slate-900', isNew: true },
  ]
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'editor'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('search');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Editor State
  const [editorData, setEditorData] = useState({
    bgImage: null,
    title: '',
    subtitle: '',
    date: '',
    players: ''
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setEditorData({
      bgImage: null,
      title: template.title,
      subtitle: '서브타이틀이나 명대사를 입력하세요',
      date: new Date().toLocaleDateString('ko-KR'),
      players: 'KPC 홍길동 / PC 김철수'
    });
    setCurrentScreen('editor');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedTemplate(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditorData({ ...editorData, bgImage: imageUrl });
    }
  };

  const handleMockDownload = () => {
    setIsDownloading(true);
    setDownloadMessage('이미지 렌더링 중...');
    
    setTimeout(() => {
      setDownloadMessage('기기에 저장되었습니다!');
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadMessage('');
      }, 2000);
    }, 1500);
  };

  const TemplateSection = ({ title, icon, templates }) => (
    <section className="mt-8">
      <div className="px-5 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-lg">
            {icon}
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        </div>
        <button className="text-sm text-slate-500 dark:text-slate-400 flex items-center hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          전체 보기 <ChevronRight size={14} />
        </button>
      </div>

      {/* 가로 스크롤 스냅 (자석 효과) 영역 */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-5 pb-4">
        {templates.map((template) => (
          <div 
            key={template.id} 
            onClick={() => handleTemplateClick(template)}
            className="snap-center shrink-0 w-[80%] sm:w-[60%] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className={`aspect-[4/3] w-full bg-gradient-to-br ${template.color} relative p-4 flex flex-col justify-between overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="inline-block px-2 py-1 bg-black/50 text-blue-200 text-xs font-bold rounded backdrop-blur-md border border-white/10">
                  {template.category}
                </span>
                {template.isNew && (
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                )}
              </div>
              <h3 className="relative z-10 text-white text-3xl font-black tracking-tighter drop-shadow-lg max-w-[80%] leading-tight break-keep">
                {template.title}
              </h3>
            </div>
            <div className="p-3">
              <p className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1 truncate">{template.title}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">{template.author}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><Heart size={12} /> {template.likes}</span>
                <span className="flex items-center gap-1"><Play size={12} /> {template.plays}</span>
              </div>
            </div>
          </div>
        ))}
        {/* 마지막 카드 스크롤 여백 */}
        <div className="snap-center shrink-0 w-[5%]" />
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen font-sans flex justify-center bg-slate-100 dark:bg-slate-950 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <style>{`
        /* 스크롤바 숨기기 스타일 */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 모바일 화면 사이즈 고정 컨테이너 */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col transition-colors duration-300">
        
        {currentScreen === 'home' ? (
          <div className="pb-24 flex-1 overflow-y-auto hide-scrollbar">
            {/* 상단 헤더 영역 */}
            <header className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Menu size={24} className="text-slate-800 dark:text-slate-200" />
              </button>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <FileText size={20} className="text-pink-500" />
                </button>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <HelpCircle size={20} className="text-slate-800 dark:text-slate-200" />
                </button>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-800" />}
                </button>
              </div>
            </header>

            {/* 카드 리스트 섹션들 */}
            <main>
              <TemplateSection title="주전 사건" icon="😆" templates={MOCK_TEMPLATES.recommended} />
              <TemplateSection title="공식 시나리오" icon="👑" templates={MOCK_TEMPLATES.official} />
              <TemplateSection title="새로 나온 사건" icon="✨" templates={MOCK_TEMPLATES.new} />
            </main>

            {            /* 하단 네비게이션 바 */}
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-slate-800 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 px-2 py-1.5 flex justify-between items-center z-50">
              {[
                { id: 'search', icon: Search, label: '시나리오 탐색' },
                { id: 'library', icon: Library, label: '서재' },
                { id: 'lobby', icon: PenTool, label: '로비' },
                { id: 'profile', icon: User, label: '내정보' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-200 ${activeTab === tab.id ? 'bg-pink-50 dark:bg-pink-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  <tab.icon size={20} className={activeTab === tab.id ? 'text-pink-600 dark:text-pink-400' : 'text-slate-400 dark:text-slate-500'} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  <span className={`text-[10px] mt-1 ${activeTab === tab.id ? 'font-bold text-pink-600 dark:text-pink-400' : 'font-medium text-slate-400 dark:text-slate-500'}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        ) : (
          /* ================= 에디터 화면 ================= */
          <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto hide-scrollbar pb-10">
            <header className="flex items-center gap-3 px-4 py-4 bg-white dark:bg-slate-900 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800 shadow-sm">
              <button onClick={handleBack} className="p-1.5 -ml-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-800 dark:text-slate-200" />
              </button>
              <h1 className="font-bold text-lg text-slate-900 dark:text-white flex-1 truncate">
                세션 카드 만들기
              </h1>
            </header>

            <main className="p-4 flex flex-col gap-6">
              {/* 세션 카드 미리보기 영역 */}
              <section>
                <div className="flex justify-between items-end mb-2 px-1">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">미리보기</h3>
                  <span className="text-[10px] text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">16:9 비율</span>
                </div>
                
                <div className="relative w-full aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 select-none">
                  {editorData.bgImage ? (
                    <img src={editorData.bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${selectedTemplate?.color || 'from-slate-700 to-slate-900'} opacity-80`}></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-4 border border-white/20 rounded"></div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white drop-shadow-md">
                    <p className="text-xs font-medium text-pink-300 mb-1 tracking-wider opacity-90">
                      {editorData.date}
                    </p>
                    <h2 className="text-3xl font-black mb-1 leading-tight tracking-tighter break-keep">
                      {editorData.title || '제목 없음'}
                    </h2>
                    <p className="text-sm font-light text-slate-200 mb-3 opacity-90 break-words line-clamp-2">
                      {editorData.subtitle}
                    </p>
                    <div className="w-8 h-0.5 bg-pink-500 mb-3"></div>
                    <p className="text-xs font-semibold text-slate-300">
                      {editorData.players}
                    </p>
                  </div>
                </div>
              </section>

              {/* 텍스트 입력 및 이미지 업로드 영역 */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">배경 사진 업로드</label>
                  <div className="relative group cursor-pointer">
                    <div className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 group-hover:border-pink-400 group-hover:text-pink-500 transition-colors">
                      <ImageIcon size={24} />
                      <span className="text-xs font-medium">터치하여 갤러리에서 선택</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">시나리오 제목</label>
                    <input 
                      type="text" 
                      value={editorData.title}
                      onChange={(e) => setEditorData({...editorData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">부제 / 명대사</label>
                    <textarea 
                      value={editorData.subtitle}
                      onChange={(e) => setEditorData({...editorData, subtitle: e.target.value})}
                      rows="2"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all font-medium resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">플레이 날짜</label>
                      <input 
                        type="text" 
                        value={editorData.date}
                        onChange={(e) => setEditorData({...editorData, date: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">참여자</label>
                      <input 
                        type="text" 
                        value={editorData.players}
                        onChange={(e) => setEditorData({...editorData, players: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-2">
                <button 
                  onClick={handleMockDownload}
                  disabled={isDownloading}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isDownloading 
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' 
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 active:scale-[0.98] shadow-xl shadow-slate-900/20 dark:shadow-white/10'
                  }`}
                >
                  {isDownloading ? (
                    <span className="animate-pulse">{downloadMessage}</span>
                  ) : (
                    <>
                      <Download size={20} />
                      이미지로 저장하기
                    </>
                  )}
                </button>
                {downloadMessage && !isDownloading && (
                  <p className="text-center text-pink-600 dark:text-pink-400 text-sm font-bold mt-3 animate-pulse">
                    {downloadMessage}
                  </p>
                )}
              </div>

            </main>
          </div>
        )}
      </div>
    </div>
  );
            }
