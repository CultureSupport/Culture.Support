import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Twitter, Linkedin, Mail, MapPin, Code2, User, 
  Heart, MessageCircle, Share2, ExternalLink, Search, Bell,
  Cpu, Terminal, Box, Play, Save
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [likes, setLikes] = useState({});
  const [feedItems, setFeedItems] = useState([]);
  const [isAutoPosting, setIsAutoPosting] = useState(true);

  const developer = {
    name: "Ole Olessiall",
    role: "Fullstack Arkitekt & UI Designer",
    location: "Oslo, Norge",
    bio: "Klar til utvikling",
    stats: { posts: feedItems.length, followers: "1.2k", following: 450 },
    skills: ["Svelte", "React", "TypeScript", "Node.js", "Three.js", "Python", "VR/AR"]
  };

  // Temaer for generering
  const themes = [
    { title: "Virtual Reality Utvikling", query: "virtual reality", tags: "#VR #Metaverse #WebXR" },
    { title: "Server Side Magi", query: "server room coding", tags: "#Backend #NodeJS #Python" },
    { title: "Python GUI Arkitektur", query: "software interface", tags: "#Python #PyQt #Tkinter" },
    { title: "App GUI 3D Design", query: "abstract 3d interface", tags: "#3D #UIUX #ThreeJS" },
    { title: "App Animasjoner", query: "motion graphics animation", tags: "#FramerMotion #Lottie" }
  ];

  const frameworkExplanations = [
    "Svelte bruker en kompilator for å flytte arbeidet fra nettleseren til byggetrinnet.",
    "Python GUI med CustomTkinter gir et moderne utseende med minimal kode.",
    "React Server Components reduserer mengden JavaScript sendt til klienten.",
    "3D-rendring i nettleseren krever optimalisering av geometri-buffere.",
    "Motion design forbedrer brukeropplevelsen ved å gi visuell feedback."
  ];

  // Last inn fra LocalStorage ved oppstart
  useEffect(() => {
    const savedFeed = localStorage.getItem('ole_feed_storage');
    if (savedFeed) {
      setFeedItems(JSON.parse(savedFeed));
    }
  }, []);

  // Lagre til LocalStorage når feeden endres
  useEffect(() => {
    if (feedItems.length > 0) {
      localStorage.setItem('ole_feed_storage', JSON.stringify(feedItems));
    }
  }, [feedItems]);

  const generatePost = () => {
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const explanation = frameworkExplanations[Math.floor(Math.random() * frameworkExplanations.length)];
    const isGif = Math.random() > 0.5;
    
    // Bruker tilfeldige bilder fra Unsplash/Pixabay-stil kilder og Giphy for animasjoner
    const imageUrl = isGif 
      ? `https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R5bmR6Z3R5bmR6Z3R5bmR6Z3R5bmR6Z3R5bmR6Z3R5JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3f7Ypa/giphy.gif`
      : `https://source.unsplash.com/featured/?${encodeURIComponent(theme.query)}&sig=${Math.random()}`;

    const newPost = {
      id: Date.now(),
      author: developer.name,
      title: theme.title,
      content: `${explanation} Her ser vi på en implementasjon av ${theme.title.toLowerCase()}. Dette er generert som en interaktiv GUI-presentasjon.`,
      image: imageUrl,
      time: "Akkurat nå",
      tags: theme.tags,
      prompt: `System-generert prompt: Utvikle en ${theme.title} ved bruk av moderne rammeverk.`
    };

    setFeedItems(prev => [newPost, ...prev].slice(0, 50)); // Beholder de siste 50
  };

  // Automatisk posting hver 20. sekund
  useEffect(() => {
    let interval;
    if (isAutoPosting) {
      interval = setInterval(() => {
        generatePost();
      }, 20000);
    }
    return () => clearInterval(interval);
  }, [isAutoPosting]);

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans p-4 md:p-8 overflow-x-hidden">
      {/* Bakgrunns-dekorasjon */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Venstre kolonne */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
            
            <div className="relative flex flex-col items-center">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-600 p-1 mb-4 group cursor-pointer">
                <div className="w-full h-full rounded-[1.4rem] bg-black flex items-center justify-center overflow-hidden">
                  <User size={54} className="text-white/80 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <h1 className="text-3xl font-black tracking-tighter">{developer.name}</h1>
              <p className="text-blue-400 font-bold text-sm mb-6 uppercase tracking-widest">{developer.role}</p>
              
              <div className="flex items-center gap-2 text-white/40 text-sm mb-8 bg-white/5 px-4 py-1 rounded-full border border-white/5">
                <MapPin size={14} /> {developer.location}
              </div>

              <div className="flex justify-around w-full py-6 border-y border-white/5 mb-8">
                <div className="text-center">
                  <div className="font-bold text-xl">{developer.stats.posts}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Innlegg</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl">{developer.stats.followers}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Følgere</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl">{developer.stats.following}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Følger</div>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-2">
                    <Terminal size={14} /> Status
                  </h3>
                  <p className="text-sm italic text-white/70">"{developer.bio}"</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {developer.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-[10px] font-bold transition-all uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <button key={i} className="p-3 bg-white/5 hover:bg-white/20 border border-white/10 rounded-2xl transition-all hover:-translate-y-1">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Local Storage Monitor */}
          <div className="bg-green-500/5 backdrop-blur-md border border-green-500/10 rounded-[2rem] p-6">
            <h3 className="text-xs font-bold text-green-400 uppercase mb-4 flex items-center gap-2">
              <Save size={14} /> Local Storage Status
            </h3>
            <div className="text-[10px] font-mono text-white/40 break-all bg-black/30 p-3 rounded-xl">
              Cache: {Math.round(JSON.stringify(feedItems).length / 1024)} KB brukt
            </div>
            <button 
              onClick={() => { localStorage.clear(); setFeedItems([]); }}
              className="mt-4 w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-[10px] uppercase font-bold text-red-400 transition-all"
            >
              Tøm alle data
            </button>
          </div>
        </aside>

        {/* Høyre kolonne */}
        <main className="lg:col-span-8 space-y-6">
          <nav className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex items-center justify-between shadow-xl">
            <div className="flex gap-8 px-4">
              {['feed', 'prosjekter', 'arkiv'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize text-sm font-bold tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-400' : 'text-white/40 hover:text-white'}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute -bottom-4 left-0 w-full h-1 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 pr-4">
               <button 
                 onClick={() => setIsAutoPosting(!isAutoPosting)}
                 className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${isAutoPosting ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
               >
                 <div className={`w-2 h-2 rounded-full ${isAutoPosting ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                 {isAutoPosting ? 'Auto-Live' : 'Pauset'}
               </button>
            </div>
          </nav>

          {/* Feed */}
          <div className="space-y-8 pb-20">
            {feedItems.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white/40">Venter på første posting (hvert 20. sekund)...</p>
              </div>
            )}
            
            {feedItems.map(item => (
              <div key={item.id} className="group bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-white/20">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-xl">
                        {item.author[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-none">{item.author}</h4>
                        <p className="text-blue-400 text-xs mt-1 font-mono">{item.time}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/5 text-[10px] font-mono text-white/30">
                      ID: {item.id.toString().slice(-6)}
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <h2 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{item.title}</h2>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {item.content}
                    </p>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 font-mono text-[11px] text-green-400/80">
                      <span className="text-white/30">// Random Prompt:</span><br/>
                      {item.prompt}
                    </div>
                  </div>

                  <div className="rounded-[2rem] overflow-hidden border border-white/10 mb-6 h-80 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"; }}
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                       {item.tags.split(' ').map(tag => (
                         <span key={tag} className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white/90 border border-white/10">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className="flex items-center gap-2 text-white/40 hover:text-pink-500 transition-all scale-110"
                    >
                      <Heart size={22} className={(likes[item.id] > 0) ? "fill-pink-500 text-pink-500" : ""} />
                      <span className="text-sm font-bold">{likes[item.id] || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/40 hover:text-blue-400 transition-all">
                      <MessageCircle size={22} />
                      <span className="text-sm font-bold">GUI Discuss</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/40 hover:text-green-400 transition-all">
                      <Share2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* GUI Overlay for "System Logging" */}
      <div className="fixed bottom-4 right-4 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hidden md:block z-50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">GUI Engine Live</span>
        </div>
        <div className="space-y-1">
          <div className="text-[9px] font-mono text-green-400/70">{`> Henter Pixabay API metadata...`}</div>
          <div className="text-[9px] font-mono text-blue-400/70">{`> Rendering 3D framework models...`}</div>
          <div className="text-[9px] font-mono text-purple-400/70">{`> LocalStorage sync: SUCCESS`}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
