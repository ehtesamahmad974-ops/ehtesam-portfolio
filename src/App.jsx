import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, X, Palette, ArrowUpRight } from 'lucide-react'
import { info, projects, cert } from './data/portfolio'

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }
const cats = ['All', ...new Set(projects.map(p => p.cat))]

export default function App() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = projects.filter(p => cat === 'All' || p.cat === cat)

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-black/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <b className="text-sm sm:text-base">{info.name}</b>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400">
            {['work', 'certificate', 'contact'].map(s => <a key={s} href={`#${s}`} className="capitalize hover:text-white">{s}</a>)}
          </div>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-24">
        <motion.div {...fade}>
          <p className="flex flex-wrap items-center gap-2 text-violet-400"><Palette size={18} /> {info.role} · {info.dept}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold">{info.name}</h1>
          <p className="mt-6 max-w-xl text-zinc-400">{info.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {info.tools.map(t => <span key={t} className="px-3 py-1 text-sm rounded-full border border-white/15">{t}</span>)}
          </div>
        </motion.div>
      </header>

      <section id="work" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold">Selected Work</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 text-sm rounded-full border ${cat === c ? 'bg-violet-500 border-violet-500' : 'border-white/15 text-zinc-400'}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(p => (
            <motion.button key={p.title} {...fade} onClick={() => setOpen(p)}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] text-left">
              <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-semibold">{p.title}</p>
                <p className="text-xs text-zinc-400">{p.cat}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section id="certificate" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold">Certification</h2>
        <motion.div {...fade} className="mt-8 max-w-2xl">
          <img src={cert.img} alt={cert.title} className="w-full rounded-2xl" />
          <p className="mt-3 font-semibold">{cert.title}</p>
          <p className="text-sm text-zinc-400">{cert.by}</p>
        </motion.div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Let's work together</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={`mailto:${info.email}`} className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-400"><Mail size={18} /> Email me</a>
          <a href={info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10">LinkedIn <ArrowUpRight size={18} /></a>
        </div>
        <p className="mt-16 text-sm text-zinc-500">© {new Date().getFullYear()} {info.name}</p>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 cursor-zoom-out">
          <X className="absolute top-5 right-5" />
          <img src={open.img} alt={open.title} className="max-h-full max-w-full rounded-xl" />
        </div>
      )}
    </>
  )
}