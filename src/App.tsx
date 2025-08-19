import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from 'react-bootstrap';
import './main.scss';

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const [sourceType, setSourceType] = useState<'open' | 'closed'>('open');
  const openBtnRef = useRef<HTMLSpanElement>(null);
  const closedBtnRef = useRef<HTMLSpanElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    github: '',
    discord: '',
    email: '',
    description: '',
    technologies: '',
    nda: false,
    budget: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
      embeds: [
        {
          title: `New project proposal (${sourceType === 'open' ? 'Open Source' : 'Closed Source'})`,
          color: sourceType === 'open' ? 0x198754 : 0xdc3545,
          fields: [
            { name: 'GitHub', value: form.github || 'N/A', inline: true },
            { name: 'Discord', value: form.discord || 'N/A', inline: true },
            { name: 'Email', value: form.email || 'N/A', inline: true },
            { name: 'Description', value: form.description || 'N/A', inline: false },
            { name: 'Technologies', value: form.technologies || 'N/A', inline: false },
            { name: 'Budget', value: form.budget || 'N/A', inline: true },
            { name: 'Timeline', value: form.timeline || 'N/A', inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };
    try {
      await fetch('https://api.status.miralys.xyz/sendWebhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });
      setSubmitted(true);
    } catch {
      setError('Failed to submit. Please try again later.');
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      import('gsap').then((gsap) => {
        gsap.default.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
        );
      });
    }
  }, []);

  // Animate form on sourceType switch
  useEffect(() => {
    if (formRef.current) {
      import('gsap').then((gsap) => {
        gsap.default.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );
      });
    }
    // Animate shadow bar between buttons
    import('gsap').then((gsap) => {
      if (openBtnRef.current && closedBtnRef.current && shadowRef.current) {
        // const fromBtn = sourceType === 'open' ? closedBtnRef.current : openBtnRef.current;
        const toBtn = sourceType === 'open' ? openBtnRef.current : closedBtnRef.current;
        // const fromRect = fromBtn.getBoundingClientRect();
        const toRect = toBtn.getBoundingClientRect();
        const containerRect = toBtn.parentElement?.parentElement?.getBoundingClientRect();
        if (containerRect) {
          const left = toRect.left - containerRect.left;
          const top = toRect.top - containerRect.top;
          gsap.default.to(shadowRef.current, {
            left,
            top,
            width: toRect.width,
            height: toRect.height,
            background: sourceType === 'open' ? 'rgba(25,135,84,0.25)' : 'rgba(220,53,69,0.25)',
            duration: 0.3,
            ease: 'power2.inOut',
          });
        }
      }
    });
  }, [sourceType]);

  return (
    <>
      <div className="background-animated">
        <div className="big-gradient" />
        <div className="floating-shape shape1" />
        <div className="floating-shape shape2" />
        <div className="floating-shape shape3" />
        <div className="floating-shape shape4" />
        <div className="floating-shape shape5" />
      </div>
      <div ref={contentRef}>
        <Container className="animated py-5" style={{ position: 'relative', zIndex: 1 }}>
          <Row className="mb-4">
            <Col md={8} className="mx-auto text-center">
              <h1>{t('title')}</h1>
              <p>{t('description')}</p>
              <div className="d-flex justify-content-center gap-2 mb-2">
                <Button variant="outline-primary" onClick={() => i18n.changeLanguage('en')}>
                  EN
                </Button>
                <Button variant="outline-primary" onClick={() => i18n.changeLanguage('fr')}>
                  FR
                </Button>
              </div>
              <div style={{ position: 'relative', display: 'inline-block', minWidth: 320 }}>
                <div
                  ref={shadowRef}
                  style={{
                    position: 'absolute',
                    borderRadius: 24,
                    pointerEvents: 'none',
                    zIndex: 0,
                    boxShadow: '0 0 24px 8px rgba(0,0,0,0.15)',
                    transition: 'background 0.3s',
                  }}
                />
                <ToggleButtonGroup
                  type="radio"
                  name="sourceType"
                  value={sourceType}
                  onChange={setSourceType}
                  className="mb-3"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <ToggleButton id="open-source" value="open" variant="outline-success">
                    <span ref={openBtnRef}>{t('openSource')}</span>
                  </ToggleButton>
                  <ToggleButton id="closed-source" value="closed" variant="outline-danger">
                    <span ref={closedBtnRef}>{t('closedSource')}</span>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8} className="mx-auto">
              <div ref={formRef}>
                {submitted ? (
                  <Alert variant="success">Thank you! We will contact you soon.</Alert>
                ) : (
                  <Form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-white">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {sourceType === 'open' && (
                      <Form.Group className="mb-3">
                        <Form.Label>{t('githubLink')}</Form.Label>
                        <Form.Control
                          type="url"
                          name="github"
                          value={form.github}
                          onChange={handleChange}
                          required
                          placeholder="https://github.com/your-repo"
                        />
                      </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('discordUsername')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="discord"
                        value={form.discord}
                        onChange={handleChange}
                        placeholder="username#1234"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('email')}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('projectDescription')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('technologiesUsed')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="technologies"
                        value={form.technologies}
                        onChange={handleChange}
                        required
                        placeholder="React, TypeScript, etc."
                      />
                    </Form.Group>
                    {sourceType === 'closed' && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Budget (optional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            placeholder="e.g. 5000€"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Timeline (optional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="timeline"
                            value={form.timeline}
                            onChange={handleChange}
                            placeholder="e.g. 3 months"
                          />
                        </Form.Group>
                      </>
                    )}
                    <Button type="submit" variant="primary" className="w-100 animated">
                      {t('submit')}
                    </Button>
                  </Form>
                )}
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <h2 className="mb-3">{t('advantages')}</h2>
              <ul className="list-group list-group-flush animated">
                <li className="list-group-item">{t('advantage1')}</li>
                <li className="list-group-item">{t('advantage2')}</li>
                <li className="list-group-item">{t('advantage3')}</li>
                <li className="list-group-item">{t('advantage4')}</li>
                <li className="list-group-item">{t('advantage5')}</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
