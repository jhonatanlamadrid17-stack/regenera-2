import React, { useState, useEffect } from 'react'
import { House, LayoutGrid, MessageSquare, Calendar, BookOpen, ArrowBigUp, Sparkles, Send, Image as ImageIcon, Plus, ChevronRight, Clock, Activity, ShieldCheck, Menu, X, Bell } from "lucide-react"

// --- Types ---
type Section = 'home' | 'programs' | 'chat' | 'questions' | 'magazine' | 'booking' | 'skin'

interface Appointment {
  id: string
  type: string
  date: string
  time: string
  doctor: string
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'doctor'
  timestamp: string
}

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Section>('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    document.title = 'eGenera | Longevidad y Bienestar'
  }, [])

  // Navigation logic
  const navigateTo = (section: Section) => {
    setActiveTab(section)
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-[#0A1F3D] text-white font-sans selection:bg-[#D4AF37] selection:text-[#0A1F3D]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F3D]/90 backdrop-blur-md border-b border-white/10 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <img src="https://roboneo-public.meitudata.com/public/html_imgs/06m4o878a037scc9/69e635142435dh0dns00754731.png" alt="eGenera Logo" className="h-8 w-8 rounded-full border border-[#D4AF37]" />
          <span className="text-xl font-bold tracking-tight text-[#D4AF37]">eGenera</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-300">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0A1F3D]"></span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-300 md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {activeTab === 'home' && <Dashboard navigateTo={navigateTo} />}
        {activeTab === 'programs' && <Programs navigateTo={navigateTo} />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'questions' && <QuestionsView />}
        {activeTab === 'magazine' && <MagazineView />}
        {activeTab === 'booking' && <BookingView booked={booked} setBooked={setBooked} />}
        {activeTab === 'skin' && <SkinAgeResetView />}
      </main>

      {/* Side Menu Drawer (for mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#0A1F3D] border-l border-white/10 p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-[#D4AF37] font-semibold uppercase text-xs tracking-widest mt-12">Menú Principal</h3>
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 text-lg"><House className="w-5 h-5" /> Inicio</button>
            <button onClick={() => navigateTo('programs')} className="flex items-center gap-3 text-lg"><LayoutGrid className="w-5 h-5" /> Programas</button>
            <button onClick={() => navigateTo('chat')} className="flex items-center gap-3 text-lg"><MessageSquare className="w-5 h-5" /> Chat Médico</button>
            <button onClick={() => navigateTo('booking')} className="flex items-center gap-3 text-lg"><Calendar className="w-5 h-5" /> Agendar Cita</button>
            <hr className="border-white/10" />
            <button onClick={() => navigateTo('questions')} className="flex items-center gap-3 text-lg"><ArrowBigUp className="w-5 h-5" /> Preguntas</button>
            <button onClick={() => navigateTo('magazine')} className="flex items-center gap-3 text-lg"><BookOpen className="w-5 h-5" /> Revista</button>
            <button onClick={() => navigateTo('skin')} className="flex items-center gap-3 text-lg text-[#D4AF37]"><Sparkles className="w-5 h-5" /> Skin Age Reset</button>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A1F3D] border-t border-white/10 px-2 py-3 md:hidden">
        <div className="flex justify-around items-center">
          <NavButton active={activeTab === 'home'} onClick={() => navigateTo('home')} icon={<House />} label="Inicio" />
          <NavButton active={activeTab === 'programs'} onClick={() => navigateTo('programs')} icon={<LayoutGrid />} label="Progs" />
          <NavButton active={activeTab === 'chat'} onClick={() => navigateTo('chat')} icon={<MessageSquare />} label="Chat" />
          <NavButton active={activeTab === 'booking'} onClick={() => navigateTo('booking')} icon={<Calendar />} label="Citas" />
          <NavButton active={activeTab === 'magazine' || activeTab === 'skin' || activeTab === 'questions'} onClick={() => setIsMenuOpen(true)} icon={<Menu />} label="Más" />
        </div>
      </nav>
    </div>
  )
}

// --- Sub-components ---

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#D4AF37]' : 'text-slate-400'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="text-[10px] uppercase font-medium">{label}</span>
    </button>
  )
}

// 1. DASHBOARD
function Dashboard({ navigateTo }: { navigateTo: (s: Section) => void }) {
  const upcomingAppointments: Appointment[] = [
    { id: '1', type: 'Chequeo Vital', date: '2026-04-20', time: '10:00 AM', doctor: 'Dr. Alejandro Ruiz' },
    { id: '2', type: 'Evaluación Deportiva', date: '2026-04-25', time: '04:30 PM', doctor: 'Dra. María Castro' }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#0A1F3D] to-[#162d50] border border-white/5">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity className="w-32 h-32 text-[#D4AF37]" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">¡Buenos días, Carlos!</h1>
          <p className="text-slate-400 mt-1">Tu camino a la longevidad comienza hoy.</p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <QuickAction onClick={() => navigateTo('booking')} icon={<Calendar className="text-[#D4AF37]" />} label="Agendar" />
        <QuickAction onClick={() => navigateTo('chat')} icon={<MessageSquare className="text-[#D4AF37]" />} label="Chat" />
        <QuickAction onClick={() => navigateTo('programs')} icon={<LayoutGrid className="text-[#D4AF37]" />} label="Programas" />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Próximas Citas</h2>
          <button onClick={() => navigateTo('booking')} className="text-sm text-[#D4AF37] font-medium">Ver todas</button>
        </div>
        {upcomingAppointments.map((app) => (
          <div key={app.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center">
            <div className="bg-[#D4AF37]/20 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{app.type}</h4>
              <p className="text-xs text-slate-400">{app.doctor}</p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-[#D4AF37]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {app.time}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {app.date}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        ))}
      </section>

      <div className="rounded-3xl overflow-hidden relative h-40 group cursor-pointer" onClick={() => navigateTo('skin')}>
        <img src="https://roboneo-public.meitudata.com/public/html_imgs/0cm4od776ds48f0u/33EE19C1_e04fde3e-c539-4fd1-84df-8bc336ad8544.png" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Skin Care" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
          <span className="bg-[#D4AF37] text-[#0A1F3D] text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-2">NUEVO</span>
          <h3 className="font-bold text-lg leading-tight">Skin Age Reset: Descubre la verdadera edad de tu piel</h3>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
      {icon}
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </button>
  )
}

// 2. PROGRAMAS
function Programs({ navigateTo }: { navigateTo: (s: Section) => void }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Nuestros Programas</h2>
        <p className="text-slate-400 text-sm mt-2">Ciencia y tecnología aplicadas a tu salud</p>
      </div>

      {/* Program A: ReGenera Active */}
      <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10">
        <img src="https://roboneo-public.meitudata.com/public/html_imgs/00m9oa7992wef2xr/69e6339852ab4dpij54vi22636.jpg" alt="Active" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#D4AF37]">ReGenera Active</h3>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Optimiza tu rendimiento físico mediante un enfoque médico-deportivo especializado.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2 text-xs text-slate-400"><Activity className="w-4 h-4 text-[#D4AF37]" /> Entrenamiento de fuerza adaptado</li>
            <li className="flex items-center gap-2 text-xs text-slate-400"><Activity className="w-4 h-4 text-[#D4AF37]" /> Mejora de capacidad aeróbica (VO₂ max)</li>
            <li className="flex items-center gap-2 text-xs text-slate-400"><Activity className="w-4 h-4 text-[#D4AF37]" /> Orientación médico-deportiva constante</li>
          </ul>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigateTo('booking')} className="bg-[#D4AF37] text-[#0A1F3D] py-2.5 rounded-xl text-sm font-bold">Agendar evaluación</button>
            <button onClick={() => navigateTo('chat')} className="border border-[#D4AF37] text-[#D4AF37] py-2.5 rounded-xl text-sm font-bold">Contactar médico</button>
          </div>
        </div>
      </div>

      {/* Program B: ReGenera Siempre Joven */}
      <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10">
        <img src="https://roboneo-public.meitudata.com/public/html_imgs/00m9oa7992wef2xr/69e633a32e08bx6hbrpn3p3087.jpg" alt="Longevity" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#D4AF37]">ReGenera Siempre Joven</h3>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Concepto de longevidad basado en el modelo <strong>CALMA</strong>, un enfoque multidominio para una vida plena.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Metabólico', 'Vascular', 'Hormonal', 'Funcional'].map(domain => (
              <div key={domain} className="bg-white/5 p-2 rounded-lg text-center border border-white/5 text-[11px] font-semibold text-slate-400">
                Dominio {domain}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigateTo('booking')} className="bg-[#D4AF37] text-[#0A1F3D] py-2.5 rounded-xl text-sm font-bold">Iniciar Chequeo Vital</button>
            <button onClick={() => navigateTo('chat')} className="border border-[#D4AF37] text-[#D4AF37] py-2.5 rounded-xl text-sm font-bold">Solicitar asesoría</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. CHAT
function ChatView() {
  const [messages] = useState<Message[]>([
    { id: 1, text: 'Hola Carlos, he revisado tus últimos resultados de laboratorio.', sender: 'doctor', timestamp: '09:00 AM' },
    { id: 2, text: 'Tu perfil metabólico está mejorando notablemente con el nuevo plan nutricional.', sender: 'doctor', timestamp: '09:01 AM' },
    { id: 3, text: '¡Qué buena noticia Dr.! ¿Debo ajustar algo en mis suplementos?', sender: 'user', timestamp: '10:15 AM' },
  ])

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in duration-500">
      <div className="bg-[#162d50] p-4 rounded-t-3xl border-b border-white/10 flex items-center gap-3">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover" alt="Doctor" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#162d50]"></span>
        </div>
        <div>
          <h3 className="font-bold text-sm">Dr. Alejandro Ruiz</h3>
          <p className="text-[10px] text-slate-400 italic">Especialista en Longevidad</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5">
        <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest my-4">Hoy</p>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#D4AF37] text-[#0A1F3D] rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
              {msg.text}
              <p className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-[#0A1F3D]/60' : 'text-slate-400'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[10px] text-yellow-500 text-center">
          Cada paciente se comunica con su médico asignado para una atención personalizada.
        </div>
      </div>

      <div className="bg-[#162d50] p-4 rounded-b-3xl flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-[#D4AF37]"><Plus className="w-5 h-5" /></button>
        <button className="p-2 text-slate-400 hover:text-[#D4AF37]"><ImageIcon className="w-5 h-5" /></button>
        <input type="text" placeholder="Escribe un mensaje..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
        <button className="bg-[#D4AF37] p-2 rounded-full text-[#0A1F3D]"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  )
}

// 4. PREGUNTAS AL MÉDICO
function QuestionsView() {
  const [activeCategory, setActiveCategory] = useState('Salud')
  const categories = ['Salud', 'Deporte', 'Longevidad', 'Nutrición']

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Consultas Médicas</h2>
        <p className="text-slate-400 text-sm mt-2">Canal estructurado para tus dudas específicas</p>
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="font-semibold">Nueva Pregunta</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-[#D4AF37] text-[#0A1F3D]' : 'bg-white/10 text-slate-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input type="text" placeholder="Asunto" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
        <textarea rows={4} placeholder="Escribe tu pregunta detalladamente..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
        <p className="text-[10px] text-slate-500 italic">Las respuestas son diferidas por el equipo médico (máximo 48h).</p>
        <button className="w-full bg-[#D4AF37] text-[#0A1F3D] py-3 rounded-xl font-bold">Enviar Consulta</button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><ArrowBigUp className="w-4 h-4 text-[#D4AF37]" /> FAQs Comunes</h3>
        <div className="space-y-3">
          {[
            { q: '¿Cuál es el mejor momento para el entrenamiento de fuerza?', a: 'Depende de tus ritmos circadianos, pero generalmente a media tarde se observa mayor rendimiento muscular.' },
            { q: '¿Qué es el VO₂ max y por qué importa?', a: 'Es la capacidad máxima de tu cuerpo para utilizar oxígeno. Es un predictor clave de longevidad y salud cardiovascular.' }
          ].map((faq, idx) => (
            <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="text-sm font-bold text-[#D4AF37]">{faq.q}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. REVISTA REGENERA
function MagazineView() {
  const articles = [
    { title: 'El secreto de la zona azul', category: 'Longevidad', excerpt: 'Cómo la dieta y la comunidad impactan en la vida centenaria.', img: 'https://roboneo-public.meitudata.com/public/html_imgs/0cm4od776ds48f0u/3D54157D_0bd93a81-a19f-47f8-ba49-fa56b0ae8bc0.png' },
    { title: 'Optimización de VO2 Max', category: 'Deporte', excerpt: 'Protocolos de HIIT para mejorar tu resistencia aeróbica.', img: 'https://roboneo-public.meitudata.com/public/html_imgs/00m9oa7992wef2xr/69e6339852ab4dpij54vi22636.jpg' },
    { title: 'Ayuno Intermitente y Autofagia', category: 'Bienestar', excerpt: 'Mitos y verdades sobre el descanso digestivo.', img: 'https://roboneo-public.meitudata.com/public/html_imgs/00m9oa7992wef2xr/69e633a32e08bx6hbrpn3p3087.jpg' }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Revista eGenera</h2>
        <BookOpen className="text-[#D4AF37]" />
      </div>

      <div className="grid gap-6">
        {articles.map((art, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10">
            <div className="h-40 overflow-hidden">
              <img src={art.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={art.title} />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{art.category}</span>
              <h3 className="text-lg font-bold mt-1 group-hover:text-[#D4AF37] transition-colors">{art.title}</h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{art.excerpt}</p>
              <button className="mt-4 text-xs font-bold flex items-center gap-1 text-[#D4AF37]">LEER MÁS <ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 6. AGENDAMIENTO
function BookingView({ booked, setBooked }: { booked: boolean, setBooked: (b: boolean) => void }) {
  if (booked) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40">
          <ShieldCheck className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">¡Cita Confirmada!</h2>
          <p className="text-slate-400 mt-2 max-w-xs">Tu cita ha sido agendada con éxito. Recibirás un recordatorio 24h antes.</p>
        </div>
        <button onClick={() => setBooked(false)} className="bg-[#D4AF37] text-[#0A1F3D] px-8 py-3 rounded-full font-bold">Volver</button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Agendar Cita</h2>
        <p className="text-slate-400 text-sm mt-2">Gestiona tus consultas médicas y evaluaciones</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setBooked(true); }}>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Sede</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] appearance-none">
            <option>Sede Principal - Bogotá</option>
            <option>Sede Norte - Chía</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Médico</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] appearance-none">
            <option>Dr. Alejandro Ruiz (Longevidad)</option>
            <option>Dra. María Castro (Deportóloga)</option>
            <option>Dr. Roberto Solano (Nutrición)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Tipo de Cita</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] appearance-none">
            <option>Chequeo Vital (Longevidad)</option>
            <option>Control Médico</option>
            <option>Evaluación Deportiva</option>
            <option>Bio-scan Facial</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Fecha Disponible</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" defaultValue="2026-04-20" />
        </div>

        <button type="submit" className="w-full bg-[#D4AF37] text-[#0A1F3D] py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#D4AF37]/20 mt-4 active:scale-95 transition-transform">Confirmar Agendamiento</button>
      </form>
    </div>
  )
}

// 7. SKIN AGE RESET
function SkinAgeResetView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="relative h-56 rounded-3xl overflow-hidden">
        <img src="https://roboneo-public.meitudata.com/public/html_imgs/0cm4od776ds48f0u/33EE19C1_e04fde3e-c539-4fd1-84df-8bc336ad8544.png" className="w-full h-full object-cover" alt="Skin Age" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
          <h2 className="text-3xl font-black italic tracking-tighter text-[#D4AF37]">SKIN AGE RESET</h2>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#D4AF37] pl-3">¿Qué es la edad de la piel?</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          La edad cronológica y la edad biológica de tu piel rara vez coinciden. El <strong>Skin Age Reset</strong> es nuestro módulo especializado para sincronizar ambas mediante ciencia avanzada.
        </p>
      </section>

      <div className="grid gap-4">
        <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
          <h4 className="font-bold text-[#D4AF37] mb-2">Prevención del Envejecimiento</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" /> Control del exposoma (radiación, polución, estrés).</li>
            <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" /> Estimulación de la síntesis de colágeno tipo I y III.</li>
            <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" /> Glycation control: evitando el endurecimiento de fibras dérmicas.</li>
          </ul>
        </div>

        <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
          <h4 className="font-bold text-[#D4AF37] mb-2">Hábitos para una Piel Longeva</h4>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {['Fotoprotección 360', 'Dermocosmética Genómica', 'Nutrición Antioxidante', 'Descanso Reparador'].map((habit, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/5 text-[10px] text-center font-medium">
                {habit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#D4AF37] to-[#b8952c] p-6 rounded-3xl text-[#0A1F3D]">
        <h4 className="font-black text-xl mb-1">TRATAMIENTOS TOP</h4>
        <p className="text-xs font-semibold opacity-80 mb-4">Tecnología de punta a tu alcance</p>
        <div className="space-y-2">
          {['Bioestimulación Inteligente', 'Peeling Metabólico', 'Terapia de Luz Roja (Red Light)'].map((t, i) => (
            <div key={i} className="flex items-center justify-between border-b border-[#0A1F3D]/10 py-2">
              <span className="text-sm font-bold">{t}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}