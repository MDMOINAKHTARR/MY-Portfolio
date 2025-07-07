// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="page-container theme-blue">
      <div className="panel-content">
        <h2 className="panel-heading">About Me</h2>
        <div className="about-panel-layout">
          <div className="about-text-content">
            <p>I am a passionate and driven B.Tech student specializing in Artificial Intelligence and Data Science, with a strong foundation in Java programming and hands-on experience in front-end technologies.</p>
            <p>My mission is to merge creative design with intelligent technology. Eager to learn in real-world environments, I'm open to opportunities where I can apply my skills and contribute meaningfully to a team.</p>
            <a href="/md_moin_akhtar_resume.pdf" download className="cta-button">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
              <span>Download Resume</span>
            </a>
          </div>
          <div className="about-glance-card">
            <h3>At a Glance</h3>
            <div className="glance-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l-10 6 10 6 10-6-10-6zm-10 8.865v4.135l10 6 10-6v-4.135l-10 6-10-6z"/></svg>
              <div className="glance-text"><h4>Current Focus</h4><p>B.Tech in AI & Data Science</p></div>
            </div>
            <div className="glance-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 6.5l-8.5 6.5 8.5 6.5v-13zm-20 0v13l8.5-6.5-8.5-6.5z"/></svg>
              <div className="glance-text"><h4>Core Skills</h4><p>Java, Python, JavaScript, React</p></div>
            </div>
            <div className="glance-item">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--secondary-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
              </svg>
              <div className="glance-text"><h4>Location & Status</h4><p>Delhi, India. Open to Opportunities.</p></div>
            </div>
          </div>
        </div>
        <div className="about-leadership-section">
          <h3>Leadership</h3>
          <div className="experience-card">
            <div className="card-header" style={{border:'none', padding:0, marginBottom:'1.5rem'}}>
              <svg viewBox="0 0 24 24" fill="var(--accent-orange)"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm-1.293-10.707l-3-3-.707.707 3.293 3.293-.086.086-1.073.342-1.227 1.227-.507 2.535 2.535-.507 1.227-1.227.342-1.073.086-.086 3.293 3.293.707-.707-3-3c-.195-.195-.512-.195-.707 0z"/></svg>
              <h3>Core Member – Data Science Club</h3>
            </div>
            <p style={{color: 'var(--secondary-text)', lineHeight:1.8}}>Contribute to organizing and managing technical events, workshops, and webinars focused on data science and AI. Work closely with the team to ensure smooth event coordination and active student participation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;