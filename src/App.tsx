import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import {
  Phone, MessageCircle, Calendar, CheckCircle2,
  TrendingUp, Star, Globe, Award, 
  Users, Building, GraduationCap, Banknote, Wallet, User,
  Plane, Briefcase, MapPin, Clock, ShieldCheck, Handshake, PlayCircle, Compass, Lightbulb, Target
} from 'lucide-react';

// --- Sidebar Nav Data ---
// Items with `sublinks` are rendered as an accordion; others are flat links.
type NavItem =
  | { label: string; path: string; sublinks?: undefined }
  | { label: string; path?: undefined; sublinks: { label: string; path: string }[] };

const sidebarItems: NavItem[] = [
  // --- Chuyển đổi (quan trọng nhất) ---
  { label: 'Ngành nghề nổi bật',      path: '/nganh-nghe' },
  { label: 'Quốc gia du học',         path: '/quoc-gia' },
  { label: 'Học bổng',                path: '/hoc-bong' },
  { label: 'Chương trình tuyển sinh', path: '/tuyen-sinh' },
  { label: 'Đánh giá hồ sơ',         path: '/trac-nghiem' },
  // --- Thông tin trung tâm ---
  { label: 'Về chúng tôi',            path: '/ve-chung-toi' },
  { label: 'Trường học & Đối tác',    path: '/doi-tac' },
  { label: 'Tin tức & Sự kiện',       path: '/tin-tuc' },
  // --- Chi phí & Kế hoạch ---
  { label: 'Chi phí du học',          path: '/chi-phi' },
  { label: 'Lộ trình 5 năm',          path: '/lo-trinh' },
  { label: 'Hỗ trợ tài chính',        path: '/ho-tro' },
  // --- Cẩm nang (accordion) ---
  {
    label: 'Cẩm nang Du học',
    sublinks: [
      { label: 'Hồ sơ & Visa',       path: '/ho-so-visa' },
      { label: 'Kinh nghiệm du học',  path: '/kinh-nghiem' },
      { label: 'Tin tức du học',      path: '/tin-tuc-du-hoc' },
    ],
  },
];

// --- Header + Sidebar ---
const Header = () => {
  const [open, setOpen] = useState(false);
  const [camNangOpen, setCamNangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar${open ? ' sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <GraduationCap size={26} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.95rem' }}>DUHOCBINHDUONG</span>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                Kiến tạo tương lai - Đến bờ thành công
              </span>
            </div>
          </Link>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Đóng menu">✕</button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            {sidebarItems.map((item) => {
              if (item.sublinks) {
                // Accordion item
                return (
                  <div key={item.label} className="sidebar-accordion">
                    <button
                      className={`sidebar-accordion-trigger${camNangOpen ? ' open' : ''}`}
                      onClick={() => setCamNangOpen(!camNangOpen)}
                    >
                      {item.label}
                      <span className="sidebar-accordion-chevron">{camNangOpen ? '▲' : '▼'}</span>
                    </button>
                    {camNangOpen && (
                      <div className="sidebar-accordion-body">
                        {item.sublinks.map((sub) => (
                          <Link key={sub.path} to={sub.path} className="sidebar-sublink">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              // Flat link
              return (
                <Link key={item.path} to={item.path} className="sidebar-link">
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link to="/lien-he" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', fontSize: '0.85rem' }}>
            Đăng ký tư vấn miễn phí
          </Link>
        </div>
      </aside>

      <header className="header">
        <div className="container header-content">
          <button className="hamburger" onClick={() => setOpen(true)} aria-label="Mở menu">
            <span /><span /><span />
          </button>

          <Link to="/" className="logo">
            <GraduationCap size={32} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>DUHOCBINHDUONG</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 400, marginTop: '-2px' }}>
                Kiến tạo tương lai - Đến bờ thành công
              </span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/lien-he" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Đánh giá miễn phí</Link>
            <Link to="/dang-nhap" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }} title="Tài khoản" className="hover-text-primary">
              <User size={24} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};


const Footer = () => (
  <footer>
    <div className="footer-cta">
      <div className="container">
        <h2>ĐẦU TƯ ĐÚNG HÔM NAY - THÀNH CÔNG BỀN VỮNG NGÀY MAI</h2>
        <p className="mt-4">Đăng ký tư vấn miễn phí để nhận lộ trình thành công cá nhân hóa cho con bạn!</p>
        <form className="footer-cta-form" onSubmit={(e) => {
          e.preventDefault();
          fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Test', phone: '123' }) })
            .then(res => res.json()).then(data => alert(data.message));
        }}>
          <input type="text" placeholder="Họ và tên phụ huynh" required />
          <input type="text" placeholder="Số điện thoại" required />
          <input type="text" placeholder="Họ và tên học sinh" required />
          <button type="submit" className="btn-yellow">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</button>
        </form>
        <p style={{ fontSize: '0.8rem', marginTop: '12px', opacity: 0.8 }}>Chúng tôi cam kết bảo mật thông tin của bạn.</p>
      </div>
    </div>
    <div className="footer-main">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ color: 'white', marginBottom: '20px' }}>
            <GraduationCap size={32} />
            <div>
              DUHOCBINHDUONG
              <div style={{ fontSize: '0.7rem', fontWeight: 400 }}>Kiến tạo tương lai - Đến bờ thành công</div>
            </div>
          </div>
        </div>
        <div className="footer-col">
          <h4>VỀ CHÚNG TÔI</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Sứ mệnh - Tầm nhìn</li>
            <li>Đội ngũ</li>
            <li>Đối tác</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>CHƯƠNG TRÌNH</h4>
          <ul>
            <li>Ngành nghề</li>
            <li>Quốc gia</li>
            <li>Lộ trình thành công</li>
            <li>Học bổng</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>HỖ TRỢ</h4>
          <ul>
            <li>Hỗ trợ tài chính</li>
            <li>Hỏi đáp</li>
            <li>Chính sách</li>
            <li>Điều khoản</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>LIÊN HỆ</h4>
          <ul>
            <li>📍 35 125, Đại lộ Bình Dương, TP. Thủ Dầu Một</li>
            <li>📞 0901 234 567</li>
            <li>✉️ tuvan@duhocbinhduong.com</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

const FloatingSidebar = () => (
  <div className="floating-sidebar">
    <Link to="/lien-he" className="floating-btn floating-btn-cta" title="Đăng ký tư vấn trực tuyến"><Calendar size={24} /></Link>
    <a href="tel:0901234567" className="floating-btn" title="Hotline"><Phone size={24} /></a>
    <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="floating-btn" title="Zalo" style={{ background: '#0068FF', color: 'white' }}><MessageCircle size={24} /></a>
    <a href="https://m.me/duhocbinhduong" target="_blank" rel="noopener noreferrer" className="floating-btn" title="Messenger" style={{ background: '#0084FF', color: 'white' }}><MessageCircle size={24} /></a>
    <Link to="/lien-he" className="floating-btn" title="Thông tin văn phòng & Bản đồ"><MapPin size={24} /></Link>
  </div>
);

// --- Sections (Reusable) ---
const RoadmapSection = () => {
  const steps = [
    {
      num: 1,
      title: 'Khám phá & Định hướng',
      desc: 'Hiểu bản thân, xác định mục tiêu và chọn đúng ngành nghề phù hợp với năng lực và sở thích.',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      tag: 'Bước 1',
    },
    {
      num: 2,
      title: 'Đào tạo & Chuẩn bị',
      desc: 'Học ngoại ngữ, hoàn thiện hồ sơ, chuẩn bị tài chính và kỹ năng cần thiết trước khi đi.',
      img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
      tag: 'Bước 2',
    },
    {
      num: 3,
      title: 'Du học & Trải nghiệm',
      desc: 'Học tập, thực hành tại nước ngoài. Làm thêm để tự trang trải và tích lũy kinh nghiệm quốc tế.',
      img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=80',
      tag: 'Bước 3',
    },
    {
      num: 4,
      title: 'Việc làm & Phát triển',
      desc: 'Có việc làm ổn định, thu nhập tăng trưởng. Mở rộng mạng lưới và thăng tiến trong ngành nghề.',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
      tag: 'Bước 4',
    },
    {
      num: 5,
      title: 'Thành công & Tự do',
      desc: 'Định cư lâu dài, tích lũy tài sản và đạt tự do tài chính tại quốc gia phát triển.',
      img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80',
      tag: 'Bước 5',
    },
  ];

  return (
    <section className="roadmap">
      <div className="container text-center">
        <h2 className="section-title">LỘ TRÌNH THÀNH CÔNG 5 NĂM</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
          Lộ trình được thiết kế khoa học, đồng hành cùng bạn từng bước từ định hướng đến tự do tài chính quốc tế.
        </p>
        <div className="roadmap-card-grid">
          {steps.map((step) => (
            <div className="roadmap-card" key={step.num}>
              <div className="roadmap-card-img-wrap">
                <img src={step.img} alt={step.title} className="roadmap-card-img" />
                <span className="roadmap-step-badge">{step.tag}</span>
              </div>
              <div className="roadmap-card-body">
                <div className="roadmap-step-num">{step.num}</div>
                <h3 className="roadmap-card-title">{step.title}</h3>
                <p className="roadmap-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/lo-trinh"><button className="btn-outline">XEM CHI TIẾT LỘ TRÌNH</button></Link>
      </div>
    </section>
  );
};


const CareersSection = () => {
  const jobs = [
    { title: 'Điều dưỡng', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', flags: ['Đức', 'Úc', 'Canada'], salary: '70 - 100 triệu/tháng', demand: 'Rất cao', duration: '3 - 4 năm', condition: 'Tốt nghiệp THPT' },
    { title: 'Cơ khí', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', flags: ['Đức', 'Úc', 'Canada'], salary: '60 - 120 triệu/tháng', demand: 'Cao', duration: '3 - 3.5 năm', condition: 'Tốt nghiệp THPT' },
    { title: 'Điện - Điện tử', img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=80', flags: ['Đức', 'Úc', 'Canada'], salary: '60 - 110 triệu/tháng', demand: 'Cao', duration: '3 - 3.5 năm', condition: 'Tốt nghiệp THPT' },
    { title: 'Nhà hàng - Khách sạn', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80', flags: ['Đức', 'Canada', 'Châu Âu'], salary: '50 - 90 triệu/tháng', demand: 'Rất cao', duration: '2 - 3 năm', condition: 'Tốt nghiệp THPT' },
    { title: 'Công nghệ thông tin', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', flags: ['Canada', 'Đức', 'Úc'], salary: '80 - 150 triệu/tháng', demand: 'Rất cao', duration: '3 - 4 năm', condition: 'Tốt nghiệp THPT / ĐH' },
    { title: 'Logistics', img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80', flags: ['Úc', 'Đức', 'Canada'], salary: '50 - 90 triệu/tháng', demand: 'Cao', duration: '2 - 3 năm', condition: 'Tốt nghiệp THPT' },
  ];

  return (
    <section className="careers">
      <div className="container text-center">
        <h2 className="section-title">KHÁM PHÁ NGÀNH NGHỀ PHÙ HỢP VỚI BẠN</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>Dù bạn là học sinh sau THPT, học nghề hay sau đại học — hãy tìm ngành nghề quốc tế phù hợp với sở thích và năng lực của mình.</p>
        <div className="career-grid">
          {jobs.map((job, idx) => (
            <div className="career-card" key={idx}>
              <img src={job.img} alt={job.title} className="career-img" />
              <div className="career-info">
                <h3>{job.title}</h3>
                <div className="flags">
                  {job.flags.map((f, i) => <span key={i}>{f}</span>)}
                </div>
                <div className="career-detail-grid">
                  <div className="career-detail-item"><Banknote size={14} /> <span>{job.salary}</span></div>
                  <div className="career-detail-item"><Clock size={14} /> <span>{job.duration}</span></div>
                  <div className="career-detail-item"><GraduationCap size={14} /> <span>{job.condition}</span></div>
                  <div className="career-detail-item"><TrendingUp size={14} /> <span>Nhu cầu: {job.demand}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/nganh-nghe"><button className="btn-outline">XEM TẤT CẢ NGÀNH NGHỀ</button></Link>
      </div>
    </section>
  );
};

// --- Sections (Reusable) ---
const EcosystemSection = () => (
  <section className="ecosystem">
    <div className="container">
      <div className="eco-content">
        <div className="eco-text">
          <h2 className="section-title" style={{ textAlign: 'left' }}>HỆ SINH THÁI<br/>ĐỒNG HÀNH TOÀN DIỆN</h2>
          <p className="mt-4" style={{ color: 'var(--text-main)' }}>
            Chúng tôi không chỉ đưa học sinh ra nước ngoài, mà đồng hành đến khi các bạn thành công và phát triển bền vững.
          </p>
          <Link to="/he-sinh-thai"><button className="btn-outline mt-4">KHÁM PHÁ HỆ SINH THÁI</button></Link>
        </div>
        <div className="eco-diagram">
          <div className="eco-ring"></div>
          <div className="eco-center">
            DUHOC<br/>BINHDUONG
            <div style={{ fontSize: '0.65rem', fontWeight: 400, marginTop: '4px' }}>Kiến tạo tương lai<br/>Đến bờ thành công</div>
          </div>
          <div className="eco-node node-1">🏫 Trung tâm ngoại ngữ</div>
          <div className="eco-node node-2">🏢 Doanh nghiệp đối tác</div>
          <div className="eco-node node-3">💰 Hỗ trợ tài chính</div>
          <div className="eco-node node-4">🤖 AI Mentor 24/7</div>
          <div className="eco-node node-5">🤝 Mạng lưới cựu học viên</div>
          <div className="eco-node node-6">🎓 Trường nghề quốc tế</div>
          <div className="eco-node node-7">🌐 Tổ chức & Chính quốc tế</div>
        </div>
        <div className="eco-stats">
          <div className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Award color="var(--primary-blue)" size={24} /><div style={{ textAlign: 'left' }}><strong>12+</strong><br/><span style={{ fontSize: '0.8rem' }}>Năm kinh nghiệm</span></div></div>
          <div className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Users color="var(--primary-blue)" size={24} /><div style={{ textAlign: 'left' }}><strong>5000+</strong><br/><span style={{ fontSize: '0.8rem' }}>Học viên thành công</span></div></div>
          <div className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Globe color="var(--primary-blue)" size={24} /><div style={{ textAlign: 'left' }}><strong>20+</strong><br/><span style={{ fontSize: '0.8rem' }}>Quốc gia đối tác</span></div></div>
          <div className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Building color="var(--primary-blue)" size={24} /><div style={{ textAlign: 'left' }}><strong>200+</strong><br/><span style={{ fontSize: '0.8rem' }}>Doanh nghiệp đối tác</span></div></div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Nguyễn Thị Hồng Nhung', title: 'Điều dưỡng tại Đức', salary: '95 triệu/tháng', text: 'Từ một học sinh học lực trung bình, mình đã có cuộc sống tốt hơn nhờ chọn đúng con đường.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Trần Văn Minh', title: 'Kỹ thuật viên tại Úc', salary: '110 triệu/tháng', text: 'Lộ trình rõ ràng, hỗ trợ tận tâm, giúp mình thành công ngoài mong đợi.', img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80' },
    { name: 'Lê Hoàng Nam', title: 'Đầu bếp tại Canada', salary: '85 triệu/tháng', text: 'Vừa học vừa làm, ra trường có việc ngay và cơ hội định cư rất rộng mở.', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80' },
    { name: 'Phạm Thùy Linh', title: 'IT Developer tại Đức', salary: '120 triệu/tháng', text: 'Cảm ơn thầy cô đã định hướng đúng, giúp mình thay đổi tương lai.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' },
  ];

  return (
    <section className="testimonials">
      <div className="container text-center">
        <h2 className="section-title" style={{ textAlign: 'center' }}>CÂU CHUYỆN THÀNH CÔNG</h2>
        <div className="test-grid">
          {testimonials.map((t, idx) => (
            <div className="test-card" key={idx}>
              <img src={t.img} alt={t.name} className="test-img" />
              <div className="test-info">
                <h4>{t.name}</h4>
                <p><strong>{t.title}</strong><br/>Thu nhập: {t.salary}</p>
                <div className="test-quote">"{t.text}"</div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/thanh-cong"><button className="btn-outline mt-4">XEM THÊM CÂU CHUYỆN</button></Link>
      </div>
    </section>
  );
};

// --- Pages ---

const TrustSection = () => (
  <section className="trust-section">
    <div className="container">
      <h2 className="section-title">TẠI SAO CHỌN DUHOCBINHDUONG?</h2>
      <p className="trust-slogan">"Đồng hành tận tâm — Khởi đầu vững chắc — Tương lai rộng mở"</p>
      <div className="trust-grid">
        <div className="trust-card">
          <div className="trust-video-placeholder">
            <PlayCircle size={48} />
            <span>Video giới thiệu trung tâm</span>
          </div>
        </div>
        <div className="trust-card">
          <ShieldCheck size={32} color="var(--primary-blue)" />
          <h3>Uy tín & Pháp lý</h3>
          <p>Được cấp phép hoạt động bởi Sở GD&ĐT, có đầy đủ giấy phép tư vấn du học quốc tế.</p>
        </div>
        <div className="trust-card">
          <Handshake size={32} color="var(--primary-blue)" />
          <h3>Đối tác quốc tế</h3>
          <p>Liên kết trực tiếp với 200+ trường nghề, đại học và doanh nghiệp tại Đức, Úc, Canada.</p>
        </div>
        <div className="trust-card">
          <Users size={32} color="var(--primary-blue)" />
          <h3>Cộng đồng cựu học viên</h3>
          <p>Mạng lưới 5000+ cựu học viên thành công, sẵn sàng chia sẻ kinh nghiệm và hỗ trợ bạn.</p>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => (
  <>
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <h1 className="hero-title">KHÁM PHÁ CON ĐƯỜNG DU HỌC — KIẾN TẠO TƯƠNG LAI CỦA BẠN</h1>
          <div className="hero-actions">
            <Link to="/lien-he" className="btn-primary" style={{ textDecoration: 'none' }}>ĐÁNH GIÁ CƠ HỘI MIỄN PHÍ</Link>
          </div>
          <div className="hero-badges">
            <div className="hero-badge"><Plane size={20} /> Du học nghề</div>
            <div className="hero-badge"><GraduationCap size={20} /> Sau đại học</div>
            <div className="hero-badge"><Globe size={20} /> Định cư quốc tế</div>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid white', zIndex: 4 }} alt="" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid white', marginLeft: '-16px', zIndex: 3 }} alt="" />
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid white', marginLeft: '-16px', zIndex: 2 }} alt="" />
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 700 }}>
              5000+ <span style={{ fontWeight: 400, fontSize: '0.95rem' }}>học viên đã và đang thành công tại nước ngoài</span>
            </p>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80" 
            alt="Du học sinh quốc tế" 
            className="hero-image"
          />
        </div>
      </div>
    </section>

    <section className="pain-points">
      <div className="container">
        <h2 className="section-title">ĐẦU TƯ CHO TƯƠNG LAI BẰNG CON ĐƯỜNG DU HỌC</h2>
        <div className="pain-grid">
          <div
            className="pain-card pain-card-img"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80')" }}
          >
            <div className="pain-card-overlay">
              <h3>Định hướng rõ ràng từ sớm</h3>
              <p>Chọn đúng nghề, đúng quốc gia — bước đầu quyết định cả tương lai.</p>
            </div>
          </div>
          <div
            className="pain-card pain-card-img"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80')" }}
          >
            <div className="pain-card-overlay">
              <h3>Đầu tư thông minh, hiệu quả cao</h3>
              <p>Vừa học vừa làm, hoàn vốn ngay từ năm đầu sau tốt nghiệp.</p>
            </div>
          </div>
          <div
            className="pain-card pain-card-img"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80')" }}
          >
            <div className="pain-card-overlay">
              <h3>Tương lai rộng mở toàn cầu</h3>
              <p>Có nghề trong tay, định cư dài hạn tại Đức, Úc, Canada dễ dàng hơn.</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <RoadmapSection />
    <CareersSection />
    <EcosystemSection />
    <TrustSection />
    <TestimonialsSection />

    {/* ── BÀI VIẾT NỔI BẬT ── */}
    <section className="home-articles">
      <div className="container">
        <div className="home-section-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Bài viết nổi bật</h2>
          <Link to="/tin-tuc" className="home-view-all">Xem tất cả →</Link>
        </div>
        <div className="featured-articles-layout">
          {/* Left: Feature image */}
          <div className="featured-main-img">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
              alt="Bài viết nổi bật du học"
            />
            <div className="featured-main-overlay">
              <span className="featured-tag">Nghề nghiệp &amp; Du học</span>
              <h3>Tốt nghiệp THPT nên đi du học nước nào để có việc làm tốt sau tốt nghiệp?</h3>
              <p>Lương Mai Vân · 15/06/2026</p>
            </div>
          </div>
          {/* Right: Article list */}
          <div className="featured-article-list">
            {[
              {
                tag: 'Chi phí & Học bổng',
                title: 'Chi Phí Du Học Hàn Quốc 2026 Cần Bao Nhiêu?',
                desc: 'Học phí, sinh hoạt phí, chứng minh tài chính và các khoản cần chuẩn bị khi du học Hàn Quốc.',
                date: '19/05/2026',
                path: '/chi-phi',
                img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=80&q=80',
              },
              {
                tag: 'Quốc gia du học',
                title: 'Du Học Nghề Đức: Lộ Trình & Cơ Hội Định Cư',
                desc: 'Đây không chỉ là con đường học tập an toàn, mà còn là lộ trình ngắn nhất để xây dựng sự nghiệp và định cư.',
                date: '19/05/2026',
                path: '/quoc-gia',
                img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=80&q=80',
              },
              {
                tag: 'Quốc gia du học',
                title: 'Điều Kiện Du Học Nhật Bản Mới Nhất 2026',
                desc: 'Cập nhật ngay điều kiện du học Nhật Bản 2026 mới nhất về độ tuổi, học vấn, tài chính và ngoại ngữ.',
                date: '19/05/2026',
                path: '/quoc-gia',
                img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=80&q=80',
              },
              {
                tag: 'Cẩm nang du học',
                title: 'Kinh Nghiệm Phỏng Vấn Visa Du Học',
                desc: 'Trọn bộ kinh nghiệm phỏng vấn visa du học chuẩn chỉnh, đúc kết từ thực tế giúp bạn tự tin nắm chắc tấm vé.',
                date: '19/05/2026',
                path: '/kinh-nghiem',
                img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=80&q=80',
              },
              {
                tag: 'Chi phí & Học bổng',
                title: 'Bí Kíp Săn Học Bổng Du Học Đài Loan',
                desc: 'Đừng để chi phí làm bạn chùn bước giấc mơ du học — bộ bí kíp săn học bổng Đài Loan đầy đủ nhất.',
                date: '19/05/2026',
                path: '/hoc-bong',
                img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&q=80',
              },
            ].map((art) => (
              <Link to={art.path} key={art.title} className="featured-article-row">
                <img src={art.img} alt={art.title} className="featured-article-thumb" />
                <div className="featured-article-info">
                  <span className="featured-article-tag">{art.tag}</span>
                  <h4 className="featured-article-title">{art.title}</h4>
                  <p className="featured-article-desc">{art.desc}</p>
                  <span className="featured-article-date">Lương Mai Vân · {art.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── NGÀNH NGHỀ NỔI BẬT ── */}
    <section className="home-articles" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="home-section-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Ngành nghề nổi bật 2026</h2>
          <Link to="/nganh-nghe" className="home-view-all">Xem tất cả →</Link>
        </div>
        <div className="career-article-grid">
          {[
            { title: 'Điều dưỡng', country: 'Đức', salary: '80–120 tr/tháng', time: '3 năm', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', path: '/nganh-nghe' },
            { title: 'Cơ khí', country: 'Đức · Nhật Bản · Hàn Quốc', salary: '70–110 tr/tháng', time: '3 năm', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80', path: '/nganh-nghe' },
            { title: 'Điện – Điện tử', country: 'Nhật Bản · Hàn Quốc', salary: '65–100 tr/tháng', time: '3 năm', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', path: '/nganh-nghe' },
            { title: 'Nhà hàng – Khách sạn', country: 'Úc · Canada', salary: '60–95 tr/tháng', time: '2 năm', img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80', path: '/nganh-nghe' },
            { title: 'Công nghệ thông tin', country: 'Đức · Canada · Úc', salary: '100–150 tr/tháng', time: '4 năm', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', path: '/nganh-nghe' },
            { title: 'Logistics', country: 'Hàn Quốc · Nhật Bản', salary: '60–90 tr/tháng', time: '3 năm', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', path: '/nganh-nghe' },
          ].map((job) => (
            <Link to={job.path} key={job.title} className="career-article-card">
              <div className="career-article-img">
                <img src={job.img} alt={job.title} />
                <span className="career-article-country">{job.country}</span>
              </div>
              <div className="career-article-body">
                <h4>{job.title}</h4>
                <div className="career-article-meta">
                  <span>💰 {job.salary}</span>
                  <span>⏱ {job.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── QUỐC GIA DU HỌC ── */}
    <section className="home-articles">
      <div className="container">
        <div className="home-section-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Quốc gia du học phổ biến</h2>
          <Link to="/quoc-gia" className="home-view-all">Xem tất cả →</Link>
        </div>
        <div className="country-article-grid">
          {[
            { name: 'Đức', flag: '🇩🇪', highlight: 'Học nghề miễn phí + lương thực tập', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&q=80', path: '/quoc-gia' },
            { name: 'Nhật Bản', flag: '🇯🇵', highlight: 'Văn hóa kỷ luật, cơ hội định cư cao', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80', path: '/quoc-gia' },
            { name: 'Hàn Quốc', flag: '🇰🇷', highlight: 'Chi phí thấp, nhu cầu nhân lực cao', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80', path: '/quoc-gia' },
            { name: 'Úc', flag: '🇦🇺', highlight: 'Định cư dễ, chất lượng cuộc sống cao', img: 'https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=500&q=80', path: '/quoc-gia' },
            { name: 'Canada', flag: '🇨🇦', highlight: 'Hệ thống PR thân thiện với lao động tay nghề', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&q=80', path: '/quoc-gia' },
            { name: 'Đài Loan', flag: '🇹🇼', highlight: 'Chi phí hợp lý, học bổng đa dạng', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=80', path: '/quoc-gia' },
          ].map((c) => (
            <Link to={c.path} key={c.name} className="country-article-card">
              <img src={c.img} alt={c.name} />
              <div className="country-article-overlay">
                <span className="country-flag">{c.flag} {c.name}</span>
                <p>{c.highlight}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── CẨM NANG & CHI PHÍ ── */}
    <section className="home-articles" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="handbook-two-col">
          {/* Cẩm nang */}
          <div className="handbook-col">
            <div className="home-section-header">
              <h2 className="section-title" style={{ marginBottom: 0, fontSize: '1.3rem' }}>Cẩm nang Du học</h2>
              <Link to="/kinh-nghiem" className="home-view-all">Xem thêm →</Link>
            </div>
            {[
              { title: 'Checklist hồ sơ du học 2026: Danh sách giấy tờ quan trọng cần chuẩn bị', path: '/ho-so-visa', date: '10/06/2026' },
              { title: 'Quy trình xin visa du học: Các bước quan trọng để tăng tỷ lệ thành công', path: '/ho-so-visa', date: '08/06/2026' },
              { title: 'Kinh nghiệm phỏng vấn visa du học: Câu hỏi thường gặp và cách trả lời hiệu quả', path: '/kinh-nghiem', date: '05/06/2026' },
              { title: '5 lỗi thường gặp khiến hồ sơ xin visa du học bị từ chối', path: '/kinh-nghiem', date: '01/06/2026' },
              { title: 'Chuẩn bị ngoại ngữ trước khi du học: Chuẩn bị hiệu quả cho học sinh Việt Nam', path: '/kinh-nghiem', date: '28/05/2026' },
            ].map((art) => (
              <Link to={art.path} key={art.title} className="handbook-article-row">
                <div className="handbook-dot" />
                <div>
                  <p className="handbook-article-title">{art.title}</p>
                  <span className="handbook-article-date">{art.date}</span>
                </div>
              </Link>
            ))}
          </div>
          {/* Chi phí & Học bổng */}
          <div className="handbook-col">
            <div className="home-section-header">
              <h2 className="section-title" style={{ marginBottom: 0, fontSize: '1.3rem' }}>Chi phí &amp; Học bổng</h2>
              <Link to="/chi-phi" className="home-view-all">Xem thêm →</Link>
            </div>
            {[
              { title: 'Chi phí du học Đức 2026: Học phí, sinh hoạt phí và các khoản cần chuẩn bị', path: '/chi-phi', date: '12/06/2026' },
              { title: 'Chi phí du học Nhật Bản 2026: Phụ huynh và học sinh cần chuẩn bị bao nhiêu tiền?', path: '/chi-phi', date: '10/06/2026' },
              { title: 'Học bổng du học nghề: Điều kiện, lợi ích và những lưu ý quan trọng', path: '/hoc-bong', date: '07/06/2026' },
              { title: 'Giải pháp tài chính du học: Vay vốn, trả góp và cách giảm áp lực chi phí cho gia đình', path: '/ho-tro', date: '03/06/2026' },
              { title: 'Bài toán ROI trong du học: Chi phí ban đầu và giá trị tương lai cho gia đình', path: '/ho-tro', date: '30/05/2026' },
            ].map((art) => (
              <Link to={art.path} key={art.title} className="handbook-article-row">
                <div className="handbook-dot" style={{ background: '#F59E0B' }} />
                <div>
                  <p className="handbook-article-title">{art.title}</p>
                  <span className="handbook-article-date">{art.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="finance">
      <div className="container">
        <div className="finance-grid">
          <div className="form-card">
            <h3 style={{ color: 'var(--primary-blue)' }}>HỖ TRỢ TÀI CHÍNH</h3>
            <div className="finance-support">
              <div className="support-item">
                <Award size={32} color="var(--primary-blue)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '0.85rem' }}>Học bổng<br/>lên đến 100%</div>
              </div>
              <div className="support-item">
                <Banknote size={32} color="var(--primary-blue)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '0.85rem' }}>Trả góp<br/>lãi suất 0%</div>
              </div>
            </div>
          </div>
          <div className="roi-card">
            <h3 style={{ marginBottom: '24px' }}>TÍNH TOÁN HIỆU QUẢ ĐẦU TƯ</h3>
            <div className="roi-stat">
              <h4>⬇️ Tổng chi phí</h4>
              <p>250 triệu</p>
            </div>
            <div className="roi-stat">
              <h4>⬆️ Thu nhập năm đầu</h4>
              <p>700 triệu/năm</p>
            </div>
          </div>
          <div className="form-card">
            <h3>AI ĐÁNH GIÁ CƠ HỘI THÀNH CÔNG</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', width: '100%' }}>
                <option>Học lực hiện tại</option>
              </select>
              <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', width: '100%' }}>
                <option>Ngân sách dự kiến</option>
              </select>
              <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => alert('Đang phân tích dữ liệu...')}>PHÂN TÍCH NGAY</button>
            </div>
          </div>
          <div className="result-card">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>KẾT QUẢ GỢI Ý</h3>
            <ul>
              <li><CheckCircle2 color="var(--primary-blue)" size={20} /> <div>Ngành nghề:<br/><strong>Điều dưỡng</strong></div></li>
              <li><CheckCircle2 color="var(--primary-blue)" size={20} /> <div>Quốc gia:<br/><strong>Đức</strong></div></li>
              <li><CheckCircle2 color="var(--accent-yellow)" size={20} /> <div>Xác suất:<br/><strong style={{ fontSize: '1.2rem', color: 'var(--accent-yellow)' }}>92%</strong></div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </>
);

const PageTemplate = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '60px 0', minHeight: '60vh', background: 'var(--bg-light)' }}>
    <div className="container">
      {children}
    </div>
  </div>
);

const RoadmapPage = () => (
  <PageTemplate>
    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}>
      <RoadmapSection />
    </div>
  </PageTemplate>
);

const CareersPage = () => (
  <PageTemplate>
    <CareersSection />
  </PageTemplate>
);

const CountriesPage = () => (
  <PageTemplate>
    <h2 className="section-title" style={{ textAlign: 'center' }}>CÁC QUỐC GIA LIÊN KẾT</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
      {['Đức 🇩🇪', 'Úc 🇦🇺', 'Canada 🇨🇦', 'Nhật Bản 🇯🇵', 'Hàn Quốc 🇰🇷', 'Châu Âu 🇪🇺'].map(c => (
        <div key={c} style={{ background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--primary-blue)' }}>{c}</h2>
          <p style={{ color: 'var(--text-muted)' }}>Tìm hiểu cơ hội du học, việc làm và định cư lâu dài tại {c.split(' ')[0]}.</p>
          <button className="btn-outline mt-4">Khám phá {c.split(' ')[0]}</button>
        </div>
      ))}
    </div>
  </PageTemplate>
);

const SuccessStoriesPage = () => (
  <PageTemplate>
    <TestimonialsSection />
  </PageTemplate>
);

const VeChungToiPage = () => {
  const experts = [
    { name: 'ThS. Nguyễn Minh Tuấn', role: 'Giám đốc tư vấn', exp: '15 năm kinh nghiệm', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
    { name: 'ThS. Trần Thị Lan Anh', role: 'Chuyên gia tư vấn Đức', exp: '10 năm kinh nghiệm', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
    { name: 'Ông Lê Quốc Bảo', role: 'Chuyên gia tư vấn Úc & Canada', exp: '12 năm kinh nghiệm', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
    { name: 'ThS. Phạm Thị Hoa', role: 'Trưởng phòng hồ sơ', exp: '8 năm kinh nghiệm', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
  ];

  const achievements = [
    { num: '5000+', label: 'Học viên thành công' },
    { num: '20+', label: 'Quốc gia đối tác' },
    { num: '200+', label: 'Doanh nghiệp liên kết' },
    { num: '12+', label: 'Năm kinh nghiệm' },
  ];

  const partners = ['Đức 🇩🇪', 'Úc 🇦🇺', 'Canada 🇨🇦', 'Nhật Bản 🇯🇵', 'Hàn Quốc 🇰🇷', 'Châu Âu 🇪🇺'];

  return (
    <div style={{ background: 'var(--bg-light)' }}>
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">VỀ CHÚNG TÔI</h1>
          <p className="about-hero-sub">Hơn 12 năm đồng hành cùng hàng nghìn gia đình Bình Dương kiến tạo tương lai quốc tế</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>

        {/* 1. Giới thiệu */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Giới thiệu Trung tâm Du học Bình Dương</h2>
          </div>
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <p>Trung tâm Du học Bình Dương (DUHOCBINHDUONG) được thành lập với sứ mệnh kết nối cơ hội giáo dục quốc tế đến với người dân tỉnh Bình Dương và khu vực lân cận. Chúng tôi chuyên cung cấp dịch vụ tư vấn và hỗ trợ toàn diện cho học sinh, sinh viên có mong muốn du học nghề và sau đại học tại các quốc gia phát triển như Đức, Úc, Canada, Nhật Bản.</p>
              <p style={{ marginTop: '16px' }}>Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới đối tác rộng khắp, chúng tôi cam kết đồng hành cùng học viên từ bước định hướng ban đầu cho đến khi họ ổn định công việc và cuộc sống tại nước ngoài.</p>
            </div>
            <div className="about-intro-stats">
              {achievements.map((a, i) => (
                <div key={i} className="about-stat-card">
                  <div className="about-stat-num">{a.num}</div>
                  <div className="about-stat-label">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Tầm nhìn - Sứ mệnh */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Tầm nhìn — Sứ mệnh — Giá trị cốt lõi</h2>
          </div>
          <div className="vmv-grid">
            <div className="vmv-card vmv-vision">
              <h3>Tầm nhìn</h3>
              <p>Trở thành trung tâm tư vấn du học uy tín hàng đầu khu vực miền Nam, giúp 20.000+ học viên có được cuộc sống tốt đẹp hơn thông qua con đường giáo dục quốc tế vào năm 2030.</p>
            </div>
            <div className="vmv-card vmv-mission">
              <h3>Sứ mệnh</h3>
              <p>Kết nối cơ hội — Đồng hành tận tâm — Kiến tạo tương lai. Chúng tôi giúp mỗi học viên tìm đúng con đường phù hợp nhất với năng lực và hoàn cảnh của họ.</p>
            </div>
            <div className="vmv-card vmv-values">
              <h3>Giá trị cốt lõi</h3>
              <ul style={{ textAlign: 'left', marginTop: '8px', lineHeight: 2 }}>
                <li><strong>Uy tín</strong> — Minh bạch trong từng cam kết</li>
                <li><strong>Tận tâm</strong> — Đặt lợi ích học viên lên hàng đầu</li>
                <li><strong>Sáng tạo</strong> — Ứng dụng công nghệ AI trong tư vấn</li>
                <li><strong>Bền vững</strong> — Đồng hành lâu dài, không bỏ lại ai</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Hệ sinh thái & Đối tác */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Hệ sinh thái du học và đối tác chiến lược</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Chúng tôi xây dựng hệ sinh thái hỗ trợ toàn diện, kết nối học viên với các tổ chức uy tín trong và ngoài nước.</p>
          <div className="eco-partners-grid">
            {['Trung tâm ngoại ngữ', 'Doanh nghiệp đối tác', 'Trường nghề quốc tế', 'Tổ chức tài chính', 'AI Mentor 24/7', 'Mạng lưới cựu học viên', 'Tổ chức quốc tế', 'Cơ sở y tế đối tác'].map((item, i) => (
              <div key={i} className="eco-partner-card">{item}</div>
            ))}
          </div>
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '16px', textAlign: 'center' }}>Quốc gia liên kết</h3>
            <div className="partner-flags">
              {partners.map((p, i) => <span key={i} className="partner-flag-tag">{p}</span>)}
            </div>
          </div>
        </section>

        {/* 4. Đội ngũ */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Đội ngũ chuyên gia tư vấn</h2>
          </div>
          <div className="experts-grid">
            {experts.map((e, i) => (
              <div key={i} className="expert-card">
                <img src={e.img} alt={e.name} className="expert-img" />
                <h4>{e.name}</h4>
                <p className="expert-role">{e.role}</p>
                <p className="expert-exp">{e.exp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Thành tựu */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Thành tựu và các chứng nhận</h2>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <h4>Top 10 Trung tâm Du học Uy tín</h4>
              <p>Do Hiệp hội Tư vấn Du học Việt Nam bình chọn năm 2023</p>
            </div>
            <div className="achievement-card">
              <h4>Giấy phép hoạt động tư vấn du học</h4>
              <p>Được cấp phép bởi Sở GD&ĐT tỉnh Bình Dương</p>
            </div>
            <div className="achievement-card">
              <h4>Đối tác chính thức tại Đức & Úc</h4>
              <p>Được công nhận bởi các tổ chức giáo dục quốc tế uy tín</p>
            </div>
            <div className="achievement-card">
              <h4>Tỷ lệ hài lòng 98%</h4>
              <p>Từ khảo sát 2000+ học viên và phụ huynh năm 2024</p>
            </div>
          </div>
        </section>

        {/* 6. Câu chuyện thành công */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Câu chuyện thành công tiêu biểu</h2>
          </div>
          <TestimonialsSection />
          <div style={{ textAlign: 'center', marginTop: '-20px' }}>
            <Link to="/lien-he"><button className="btn-primary">ĐĂNG KÝ TƯ VẤN — VIẾT TIẾP CÂU CHUYỆN CỦA BẠN</button></Link>
          </div>
        </section>

      </div>
    </div>
  );
};

const FinancialSupportPage = () => (
  <PageTemplate>
    <h2 className="section-title" style={{ textAlign: 'center' }}>GIẢI PHÁP TÀI CHÍNH TỐI ƯU</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
        <Banknote size={64} color="var(--primary-blue)" style={{ margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '12px' }}>Ngân Hàng Cho Vay 100%</h3>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6 }}>Hỗ trợ vay vốn ngân hàng lên đến 100% chi phí với thủ tục đơn giản, giải ngân nhanh chóng. Gia đình không cần lo lắng về áp lực tài chính ban đầu.</p>
      </div>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
        <Wallet size={64} color="var(--primary-blue)" style={{ margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '12px' }}>Vừa Học Vừa Trả</h3>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6 }}>Với chương trình học nghề có lương thực tập tại nước ngoài, học viên hoàn toàn có thể dùng chính thu nhập của mình để tự trang trải sinh hoạt và trả dần khoản vay.</p>
      </div>
    </div>
  </PageTemplate>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '60px 20px', minHeight: 'calc(100vh - 300px)', background: 'var(--bg-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);

const LoginPage = () => (
  <AuthLayout>
    <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-blue)', marginBottom: '8px', fontWeight: 700 }}>Đăng nhập</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chào mừng bạn quay trở lại</p>
      </div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Email</label>
          <input type="email" placeholder="Nhập email" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-main)' }}>
            <input type="checkbox" style={{ accentColor: 'var(--primary-blue)', width: '14px', height: '14px' }} /> Ghi nhớ tôi
          </label>
          <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 500 }}>Quên mật khẩu?</a>
        </div>
        <button type="button" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', width: '100%', marginTop: '4px', borderRadius: '8px', fontWeight: 600 }}>Đăng nhập</button>
      </form>
      <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Chưa có tài khoản? <Link to="/dang-ky" style={{ color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>Đăng ký</Link>
      </div>
    </div>
  </AuthLayout>
);

const RegisterPage = () => (
  <AuthLayout>
    <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-blue)', marginBottom: '8px', fontWeight: 700 }}>Đăng ký</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tạo tài khoản mới để bắt đầu</p>
      </div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Họ và tên</label>
          <input type="text" placeholder="Nhập họ và tên" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Email</label>
          <input type="email" placeholder="Nhập email" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Mật khẩu</label>
          <input type="password" placeholder="Tạo mật khẩu" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Xác nhận mật khẩu</label>
          <input type="password" placeholder="Nhập lại mật khẩu" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button type="button" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', width: '100%', marginTop: '8px', borderRadius: '8px', fontWeight: 600 }}>Đăng ký</button>
      </form>
      <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Đã có tài khoản? <Link to="/dang-nhap" style={{ color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>Đăng nhập</Link>
      </div>
    </div>
  </AuthLayout>
);

const ContactPage = () => (
  <PageTemplate>
    <div style={{ display: 'flex', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ flex: 1, background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Gửi yêu cầu tư vấn</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hãy để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ lại ngay.</p>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Họ và tên</label>
            <input type="text" placeholder="Nhập họ và tên" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Email</label>
            <input type="email" placeholder="Nhập địa chỉ email" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>Lời nhắn</label>
            <textarea placeholder="Bạn muốn hỏi về chương trình nào?" rows={4} style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
          </div>
          <button type="button" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', width: '100%', marginTop: '8px', borderRadius: '8px', fontWeight: 600 }}>Gửi Thông Tin</button>
        </form>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '24px', color: 'var(--primary-blue)', fontSize: '1.5rem', fontWeight: 700 }}>Thông tin liên hệ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1rem', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--primary-blue)', marginTop: '2px' }}><Building size={24} /></div>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Địa chỉ văn phòng</strong>
                <span style={{ color: 'var(--text-muted)' }}>35 125, Đại lộ Bình Dương, TP. Thủ Dầu Một</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--primary-blue)', marginTop: '2px' }}><Phone size={24} /></div>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Hotline tư vấn</strong>
                <span style={{ color: 'var(--text-muted)' }}>0901 234 567</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--primary-blue)', marginTop: '2px' }}><MessageCircle size={24} /></div>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Email hỗ trợ</strong>
                <span style={{ color: 'var(--text-muted)' }}>tuvan@duhocbinhduong.com</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '24px', flex: 1, minHeight: '200px', background: 'var(--light-blue)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <Globe size={48} style={{ opacity: 0.5 }} />
          <span style={{ marginLeft: '12px', fontSize: '1.1rem', fontWeight: 600 }}>Bản đồ Google Maps</span>
        </div>
      </div>
    </div>
  </PageTemplate>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ve-chung-toi" element={<VeChungToiPage />} />
          <Route path="/lo-trinh" element={<RoadmapPage />} />
          <Route path="/nganh-nghe" element={<CareersPage />} />
          <Route path="/quoc-gia" element={<CountriesPage />} />
          <Route path="/thanh-cong" element={<SuccessStoriesPage />} />
          <Route path="/ho-tro" element={<FinancialSupportPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
        </Routes>
        <Footer />
        <FloatingSidebar />
      </div>
    </Router>
  );
}

export default App;
