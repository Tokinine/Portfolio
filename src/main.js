import './style.css'
import {initProjects} from './projects.js'
import {initNav} from './nav.js'
import {initBackground} from './background.js'
import {initHero} from './hero.js'
import {initRibbons} from './ribbons.js'
import {mercury} from './mercury.js'
import {reveal} from './reveal.js'

initProjects(document.getElementById('rail'))
document.querySelectorAll('.rv').forEach(el=>reveal(el))
document.querySelectorAll('.band').forEach(el=>mercury(el))
initHero()
initBackground()
initRibbons()
initNav()

const idle=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('idle',!e.isIntersecting)))
document.querySelectorAll('.chrome').forEach(el=>idle.observe(el))
