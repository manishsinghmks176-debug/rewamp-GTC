/**
 * GUJARAT TECH CONSULTANTS (GTC) — CANVAS & NODE ENGINE
 * Melius-Style Interactive Node Graph with Glowing Bezier Cables & Ambient Particles
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Ambient Hero Particle System & Cursor Glow
  // =========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 60 : 30, 70);
    const mouse = { x: width / 2, y: height / 2, radius: 180 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.7 ? '#FF5500' : '#888899';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse avoidance/attraction subtle physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#FF5500';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // =========================================================================
  // 2. Interactive Delivery Graph & Bezier Cables (Melius 1:1 Parity)
  // =========================================================================

  const PIPELINE_DATA = {
    manufacturing: {
      title: "Precision Metal & Industrial (e.g. Shanay Industries)",
      badge: "B2B CAPABILITY",
      description: "Laser cutting, tube & sheet engineering with tolerance-driven RFQ drawing intake.",
      nodes: [
        {
          id: "node-1",
          label: "Client Brief & Engineering Specs",
          tag: "CAD INTAKE",
          badgeColor: "badge-orange",
          engine: "Constraint Parser v4.2",
          metric: "Tolerances: ±0.02mm",
          headline: "Tube & Sheet Laser Cutting Brief",
          body: "Ahmedabad fabrication plant requiring automated CAD (.dxf/.dwg) intake, material grade selector (SS304/MS/Aluminium), and instant quotation routing.",
          telemetry: { Protocol: "B2B RFQ", Security: "ISO-27001", Validation: "Auto-Checked" }
        },
        {
          id: "node-2",
          label: "Kinetic UI & Component Architecture",
          tag: "DESIGN SYSTEM",
          badgeColor: "badge-outline",
          engine: "Spatial 3D + Next.js",
          metric: "60 FPS WebGL",
          headline: "Industrial Machinery & Spec Explorer",
          body: "Dark graphite layout with interactive tolerance charts, high-resolution machine photography, and zero-clutter drawing submission flow.",
          telemetry: { Framework: "React 19 / Tailwind", Shaders: "Custom WebGL", Mobile: "PWA Optimized" }
        },
        {
          id: "node-3",
          label: "Edge Compute & Cloud Infrastructure",
          tag: "GLOBAL EDGE",
          badgeColor: "badge-outline",
          engine: "Cloudflare Edge + SSL",
          metric: "P99 < 32ms",
          headline: "Sub-Second Global Asset Delivery",
          body: "Global edge CDN, automated Brotli compression, DDoS shields, and direct webhook dispatch to WhatsApp and enterprise ERP systems.",
          telemetry: { DNS: "Zero Downtime", Ownership: "100% Client-Owned", Latency: "28ms India" }
        },
        {
          id: "node-4",
          label: "Commercial Deployment & Authority",
          tag: "VERIFIED ASSET",
          badgeColor: "badge-green",
          engine: "MSME Scheme Partner",
          metric: "100/100 Lighthouse",
          headline: "Live in 10 Days + Smart NFC Badge",
          body: "Certified digital presence, verified Google Business listing, and physical NFC business smart card with 1-tap drawing download.",
          telemetry: { Subsidy: "Gujarat MSME 38%", CoreWebVitals: "0.8s LCP", Domain: "Client Direct" }
        }
      ]
    },

    hospitality: {
      title: "Heritage & Cultural Hospitality (e.g. Vishalla)",
      badge: "HERITAGE LUXURY",
      description: "Mud floors, leaf plates, and 47 years of tradition translated into a quiet reservation engine.",
      nodes: [
        {
          id: "node-1",
          label: "Heritage Narrative & Cultural Archive",
          tag: "STORY ARCHITECTURE",
          badgeColor: "badge-orange",
          engine: "Narrative Engine v2",
          metric: "Est. 1978 Archive",
          headline: "Village Museum & Dining Brief",
          body: "Preserve the lamp-lit quietude of traditional Gujarati dining without degrading into costume or tacky restaurant templates.",
          telemetry: { Proportions: "Jharokha Grid", Photography: "Lamplight Natural", Voice: "Quiet & Confident" }
        },
        {
          id: "node-2",
          label: "Atmospheric UI & Reserve Journey",
          tag: "DESIGN LANGUAGE",
          badgeColor: "badge-outline",
          engine: "Warm Obsidian Glass",
          metric: "Zero Friction Flow",
          headline: "Floor Seating & Museum Walkthrough",
          body: "Visitors explore the utensil museum, leaf plate rituals, and reserve their dining table before arrival with zero waiting queue.",
          telemetry: { MultiLang: "Gujarati / English", UI: "Touch First", Latency: "Instant Tap" }
        },
        {
          id: "node-3",
          label: "Edge Reservation & Direct Routing",
          tag: "BOOKING ENGINE",
          badgeColor: "badge-outline",
          engine: "Edge Webhook Engine",
          metric: "Instant Confirmation",
          headline: "Zero Third-Party Commission Engine",
          body: "Direct guest reservations bypassing expensive aggregator commission fees, sending automated WhatsApp arrival passes with location pins.",
          telemetry: { WhatsApp: "Direct 1-Click", Currency: "INR / USD", Storage: "Secure Encrypted" }
        },
        {
          id: "node-4",
          label: "Physical-to-Digital Guest NFC Touch",
          tag: "VERIFIED OUTCOME",
          badgeColor: "badge-green",
          engine: "NFC Smart Touchpoint",
          metric: "4.9 Google Rating",
          headline: "Verified Digital Presence & Smart Card",
          body: "Guests tap the physical NFC card on heritage tables to open private menus, artisan histories, and Google 5-star reviews seamlessly.",
          telemetry: { CardFinish: "Matte Obsidian", MSMEGrant: "Approved", Delivery: "12 Days Live" }
        }
      ]
    },

    resort: {
      title: "Eco-Luxury & Safari Retreat (e.g. Woods at Sasan)",
      badge: "EXPERIENCE ECOSYSTEM",
      description: "Eight acres of mango orchard at Gir Forest. Biophilic stone, lime, and quiet guest journeys.",
      nodes: [
        {
          id: "node-1",
          label: "Biophilic Retreat & Guest Intent",
          tag: "WILDLIFE EXP",
          badgeColor: "badge-orange",
          engine: "Guest Journey Architect",
          metric: "8 Acres Gir",
          headline: "Orchard & Forest Sanctuary Brief",
          body: "Calm, sensory digital front door that mirrors the natural stone and mango trees, allowing international safari explorers to book retreats.",
          telemetry: { Focus: "High-Net-Worth", Experience: "Safari & Wellness", Geography: "Global Bookers" }
        },
        {
          id: "node-2",
          label: "Spatial Visual System & Gallery",
          tag: "EDITORIAL UI",
          badgeColor: "badge-outline",
          engine: "Fluid Motion Engine",
          metric: "Retina Optimized",
          headline: "Cinematic Photography Direction",
          body: "Editorial multi-layer layout showcasing the 8 private suites, organic orchard dining, and guided lion tracking expeditions.",
          telemetry: { Video: "60 FPS Ambient", Imagery: "Real On-Site", Contrast: "Deep Earthy Dark" }
        },
        {
          id: "node-3",
          label: "High-Availability Direct Booking Cloud",
          tag: "CLOUD PIPELINE",
          badgeColor: "badge-outline",
          engine: "Serverless Edge Cloud",
          metric: "99.99% Uptime",
          headline: "Direct Booking Engine with Zero Dropoff",
          body: "Lightning fast calendar picker, international credit card processing, and WhatsApp concierge integration for customized itinerary planning.",
          telemetry: { SSL: "TLS 1.3 Strict", Cache: "Edge Global 300+ PoPs", MobileLoad: "1.1s" }
        },
        {
          id: "node-4",
          label: "Verified Authority & Digital Identity",
          tag: "GOVT PARTNERSHIP",
          badgeColor: "badge-green",
          engine: "Gujarat MSME Scheme",
          metric: "Zero Commission",
          headline: "100% Owned Digital Real Estate",
          body: "Full source code, domain, and server keys transferred to the owner on day 10, saving lakhs in annual booking portal commissions.",
          telemetry: { Domain: "Direct Owner Login", Renewal: "Honest ₹3,000/yr", Support: "Direct Engineer" }
        }
      ]
    },

    saas: {
      title: "Enterprise FinTech & High-Scale SaaS",
      badge: "ENTERPRISE SCALE",
      description: "Sub-second dashboards, compliance certifications, and hyper-scalable modern web stacks.",
      nodes: [
        {
          id: "node-1",
          label: "System Architecture & API Blueprint",
          tag: "DATA SCHEMAS",
          badgeColor: "badge-orange",
          engine: "Enterprise Architect",
          metric: "Zero Tech Debt",
          headline: "Enterprise Full-Stack Specification",
          body: "Complete wireframe and backend architecture designed for scale, automated authentication, and multi-tenant security.",
          telemetry: { DB: "PostgreSQL / Supabase", API: "GraphQL / REST", Security: "SOC2 Ready" }
        },
        {
          id: "node-2",
          label: "Hyper-Performance Glass UI",
          tag: "KINETIC DASHBOARD",
          badgeColor: "badge-outline",
          engine: "React 19 + Framer",
          metric: "Sub-16ms Frame Render",
          headline: "Sleek Dark Obsidian Workspace",
          body: "High-density data widgets, real-time telemetry graphs, and frictionless conversion funnels designed to turn visitors into paying accounts.",
          telemetry: { CSS: "Zero Runtime Tailwind", BundleSize: "< 45kb", A11y: "WCAG AAA" }
        },
        {
          id: "node-3",
          label: "Distributed Edge & Microservices",
          tag: "COMPUTE MESH",
          badgeColor: "badge-outline",
          engine: "Global Anycast Edge",
          metric: "Global P99 < 40ms",
          headline: "Zero Cold Starts, Zero Server Sprawl",
          body: "Serverless edge functions running across 300+ global locations with instant cache invalidation and distributed SQL databases.",
          telemetry: { WAF: "Cloudflare Pro", Encryption: "AES-256 GCM", CDN: "Tier 1 Peering" }
        },
        {
          id: "node-4",
          label: "Commercial Domination & Live Analytics",
          tag: "MARKET DEPLOYMENT",
          badgeColor: "badge-green",
          engine: "Verified Analytics",
          metric: "100/100 Core Vitals",
          headline: "Launch in Under 14 Days",
          body: "Engineered to dominate search rankings, achieve instant trust, and deliver maximum conversion velocity with MSME cost subsidies.",
          telemetry: { SubsidyClaim: "Official Gujarat Govt", Guarantee: "Money-Back SLA", Uptime: "100.0%" }
        }
      ]
    }
  };

  let activePipelineKey = 'manufacturing';
  let activeNodeIndex = 0;

  // Render the nodes and draw glowing bezier paths
  function renderPipeline(key) {
    activePipelineKey = key;
    const data = PIPELINE_DATA[key];
    if (!data) return;

    // Update banner metadata
    const titleEl = document.getElementById('pipeline-title');
    const badgeEl = document.getElementById('pipeline-badge');
    const descEl = document.getElementById('pipeline-desc');
    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (descEl) descEl.textContent = data.description;

    // Render nodes inside canvas container
    const container = document.getElementById('pipeline-nodes-container');
    if (!container) return;

    container.innerHTML = '';

    data.nodes.forEach((node, idx) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = `node-box ${idx === activeNodeIndex ? 'active' : ''}`;
      nodeEl.id = `ui-node-${idx}`;
      nodeEl.dataset.index = idx;

      // Positioning for desktop layout
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        nodeEl.style.left = `${idx * 265 + 24}px`;
        nodeEl.style.top = `${idx % 2 === 0 ? 36 : 96}px`;
        nodeEl.style.width = '240px';
      } else {
        nodeEl.style.position = 'relative';
        nodeEl.style.width = '100%';
        nodeEl.style.marginBottom = '20px';
      }

      nodeEl.innerHTML = `
        <div class="node-header">
          <span>${node.tag}</span>
          <span style="color: var(--accent-orange);">${node.engine}</span>
        </div>
        <div style="font-size: 0.8125rem; font-weight: 700; margin-bottom: 6px; color: #FFFFFF; font-family: var(--font-display);">
          ${node.label}
        </div>
        <div class="node-content-preview" style="padding: 10px; font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">
          <div style="font-weight: 600; color: #E5E7EB; margin-bottom: 4px;">${node.headline}</div>
          <div style="font-size: 0.6875rem; color: var(--text-muted);">${node.body.substring(0, 75)}...</div>
          <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between;">
            <span class="badge-tag ${node.badgeColor}">${node.metric}</span>
            <span style="font-size: 0.625rem; font-family: var(--font-mono); color: var(--accent-orange);">Inspect ↗</span>
          </div>
        </div>
        <!-- Connection pins -->
        <div class="pin pin-left" style="position: absolute; left: -5px; top: 50%; width: 10px; height: 10px; background: var(--accent-orange); border-radius: 50%; border: 2px solid #000;"></div>
        <div class="pin pin-right" style="position: absolute; right: -5px; top: 50%; width: 10px; height: 10px; background: var(--accent-orange); border-radius: 50%; border: 2px solid #000;"></div>
      `;

      nodeEl.addEventListener('click', () => {
        document.querySelectorAll('.node-box').forEach(n => n.classList.remove('active'));
        nodeEl.classList.add('active');
        activeNodeIndex = idx;
        updateInspector(node);
      });

      container.appendChild(nodeEl);
    });

    // Update inspector with current active node
    updateInspector(data.nodes[activeNodeIndex]);

    // Draw SVG Bezier Curves
    setTimeout(drawBezierCables, 50);
  }

  // Update Telemetry Inspector Card
  function updateInspector(node) {
    const inspector = document.getElementById('node-telemetry-inspector');
    if (!inspector) return;

    let telemetryRows = '';
    for (const [key, val] of Object.entries(node.telemetry)) {
      telemetryRows += `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: var(--font-mono); font-size: 0.75rem;">
          <span style="color: var(--text-muted);">${key}:</span>
          <span style="color: #FFFFFF; font-weight: 500;">${val}</span>
        </div>
      `;
    }

    inspector.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <span class="badge-tag ${node.badgeColor}">${node.tag}</span>
        <span style="font-size: 0.6875rem; font-family: var(--font-mono); color: #10B981; display: flex; align-items: center; gap: 5px;">
          <span style="width: 6px; height: 6px; background: #10B981; border-radius: 50%; display: inline-block; animation: pulseGlow 1.5s infinite;"></span>
          LIVE PIPELINE
        </span>
      </div>
      <h4 style="font-size: 1.05rem; font-weight: 700; color: #FFFFFF; margin-bottom: 6px; font-family: var(--font-display);">${node.label}</h4>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">${node.body}</p>
      
      <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 12px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 16px;">
        <div style="font-size: 0.6875rem; font-family: var(--font-mono); color: var(--accent-orange); margin-bottom: 8px; text-transform: uppercase;">Realtime Node Telemetry</div>
        ${telemetryRows}
      </div>

      <div style="display: flex; gap: 8px;">
        <button class="btn-primary" style="height: 34px; font-size: 0.75rem; padding: 0 14px; width: 100%; justify-content: center;" onclick="openEstimateModal('${node.label}')">
          Deploy This Architecture →
        </button>
      </div>
    `;
  }

  // Draw Glowing Bezier Curves between Nodes
  function drawBezierCables() {
    if (window.innerWidth < 1024) return; // Only draw desktop canvas wires

    const svg = document.getElementById('bezier-wires-svg');
    if (!svg) return;

    svg.innerHTML = '';
    const nodes = document.querySelectorAll('.node-box');
    if (nodes.length < 2) return;

    for (let i = 0; i < nodes.length - 1; i++) {
      const n1 = nodes[i];
      const n2 = nodes[i + 1];

      const x1 = n1.offsetLeft + n1.offsetWidth;
      const y1 = n1.offsetTop + n1.offsetHeight / 2;

      const x2 = n2.offsetLeft;
      const y2 = n2.offsetTop + n2.offsetHeight / 2;

      const dx = (x2 - x1) * 0.55;

      const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

      // Background cable glow
      const glowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      glowPath.setAttribute('d', pathData);
      glowPath.setAttribute('stroke', 'rgba(255, 85, 0, 0.25)');
      glowPath.setAttribute('stroke-width', '4');
      glowPath.setAttribute('fill', 'none');
      svg.appendChild(glowPath);

      // Active wire with animated dashes
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('class', 'bezier-wire');
      svg.appendChild(path);

      // Endpoint circle pins
      const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c1.setAttribute('cx', x1);
      c1.setAttribute('cy', y1);
      c1.setAttribute('r', '4');
      c1.setAttribute('class', 'wire-terminal');
      svg.appendChild(c1);

      const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c2.setAttribute('cx', x2);
      c2.setAttribute('cy', y2);
      c2.setAttribute('r', '4');
      c2.setAttribute('class', 'wire-terminal');
      svg.appendChild(c2);
    }
  }

  // Initialize pipeline tab controls
  window.initDeliveryCanvas = function () {
    const tabs = document.querySelectorAll('.pipeline-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active', 'btn-primary'));
        tabs.forEach((t) => t.classList.add('btn-secondary'));
        tab.classList.remove('btn-secondary');
        tab.classList.add('active', 'btn-primary');

        const key = tab.dataset.pipeline;
        renderPipeline(key);
      });
    });

    renderPipeline('manufacturing');
    window.addEventListener('resize', () => {
      setTimeout(drawBezierCables, 100);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.initDeliveryCanvas();
  });
})();
