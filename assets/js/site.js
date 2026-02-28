(() => {
  const body = document.body;
  if (!body) {
    return;
  }

  const root = body.dataset.root || "";
  const page = body.dataset.page || "";
  const currentHash = (window.location.hash || "").replace("#", "").toLowerCase();

  const comparePages = [
    { id: "compare-workday", label: "AxisHR vs Workday", href: "compare-workday.html" },
    { id: "compare-sap-successfactors", label: "AxisHR vs SAP SuccessFactors", href: "compare-sap-successfactors.html" },
    { id: "compare-bamboohr", label: "AxisHR vs BambooHR", href: "compare-bamboohr.html" },
    { id: "compare-rippling", label: "AxisHR vs Rippling", href: "compare-rippling.html" },
    { id: "compare-adp-workforce-now", label: "AxisHR vs ADP Workforce Now", href: "compare-adp-workforce-now.html" }
  ];

  const industryPages = [
    { id: "industries", label: "Industry Overview", href: "industries.html" },
    { label: "Manufacturing", href: "industries.html#manufacturing" },
    { label: "Banking And Financial Services", href: "industries.html#banking-financial-services" },
    { label: "Healthcare", href: "industries.html#healthcare" },
    { label: "Logistics And Distribution", href: "industries.html#logistics-distribution" },
    { label: "Retail And FMCG", href: "industries.html#retail-fmcg" },
    { label: "Professional Services And Technology", href: "industries.html#professional-services-technology" }
  ];

  const platformPages = [
    { id: "platform", label: "Platform Overview", href: "platform/index.html" },
    { id: "platform-employee-management", label: "Employee Management", href: "platform/employee-management.html" },
    { id: "platform-multi-branch-operations", label: "Multi-Branch Operations", href: "platform/multi-branch-operations.html" },
    { id: "platform-global-employment", label: "Global Employment", href: "platform/global-employment.html" },
    { id: "platform-time-attendance", label: "Time & Attendance", href: "platform/time-attendance.html" },
    { id: "platform-leave-management", label: "Leave Management", href: "platform/leave-management.html" },
    { id: "platform-payroll", label: "Payroll", href: "platform/payroll.html" },
    { id: "platform-performance-management", label: "Performance Management", href: "platform/performance-management.html" },
    { id: "platform-onboarding-offboarding", label: "Onboarding & Offboarding", href: "platform/onboarding-offboarding.html" },
    { id: "platform-reports-analytics", label: "Reports & Analytics", href: "platform/reports-analytics.html" },
    { id: "platform-compensation", label: "Compensation", href: "platform/compensation.html" },
    { id: "platform-compliance-security", label: "Compliance & Security", href: "platform/compliance-security.html" },
    { id: "platform-claims-expenses", label: "Claims & Expenses", href: "platform/claims-expenses.html" },
    { id: "platform-engagement-surveys", label: "Engagement & Surveys", href: "platform/engagement-surveys.html" },
    { id: "platform-authentication-access", label: "Authentication & Access Control", href: "platform/authentication-access.html" },
    { id: "platform-organization-structure", label: "Organization Structure", href: "platform/organization-structure.html" },
    { id: "platform-dashboards-alerts", label: "Dashboards & Alerts", href: "platform/dashboards-alerts.html" },
    { id: "platform-notifications-communication", label: "Notifications & Communication", href: "platform/notifications-communication.html" },
    { id: "platform-integrations-api", label: "Integrations & API", href: "platform/integrations-api.html" },
    { id: "platform-mobile-workforce", label: "Mobile Workforce", href: "platform/mobile-workforce.html" }
  ];

  const navItems = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "why", label: "Why AxisHR", href: "why-axishr.html" },
    { id: "compare", label: "Compare", href: "compare-axishr.html", children: comparePages, menuClass: "compare-menu" },
    { id: "industries", label: "Industries", href: "industries.html", children: industryPages, menuClass: "industries-menu" },
    { id: "pricing", label: "Pricing", href: "pricing.html" },
    { id: "platform", label: "Our Platform", href: "platform/index.html", children: platformPages, menuClass: "platform-menu" },
    { id: "about", label: "About", href: "about.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  const platformLinks = [
    { label: "Employee Management", href: "platform/employee-management.html" },
    { label: "Multi-Branch Operations", href: "platform/multi-branch-operations.html" },
    { label: "Global Employment", href: "platform/global-employment.html" },
    { label: "Time & Attendance", href: "platform/time-attendance.html" },
    { label: "Leave Management", href: "platform/leave-management.html" },
    { label: "Payroll", href: "platform/payroll.html" },
    { label: "Performance Management", href: "platform/performance-management.html" },
    { label: "Onboarding & Offboarding", href: "platform/onboarding-offboarding.html" },
    { label: "Reports & Analytics", href: "platform/reports-analytics.html" },
    { label: "Compensation", href: "platform/compensation.html" },
    { label: "Compliance & Security", href: "platform/compliance-security.html" },
    { label: "Claims & Expenses", href: "platform/claims-expenses.html" },
    { label: "Engagement & Surveys", href: "platform/engagement-surveys.html" }
  ];

  const isPlatformPage = page === "platform" || page.startsWith("platform-");
  const isComparePage = page === "compare" || page.startsWith("compare-");
  const isContactPage = page === "contact" || page === "book-demo";

  const isActive = (id) => {
    if (id === "platform") {
      return isPlatformPage;
    }
    if (id === "compare") {
      return isComparePage;
    }
    if (id === "contact") {
      return isContactPage;
    }
    return page === id;
  };

  const getHashFromHref = (href) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex < 0) {
      return "";
    }
    return href.slice(hashIndex + 1).toLowerCase();
  };

  const isChildActive = (parentId, child) => {
    if (parentId === "industries" && page === "industries") {
      const targetHash = getHashFromHref(child.href);
      if (!targetHash) {
        return currentHash === "";
      }
      return currentHash === targetHash;
    }

    if (child.id && page === child.id) {
      return true;
    }

    return false;
  };

  const renderNavItem = (item) => {
    const itemClass = isActive(item.id) ? "is-active" : "";
    if (!item.children || !item.children.length) {
      return `
        <li class="nav-item">
          <a class="nav-link ${itemClass}" href="${root}${item.href}">${item.label}</a>
        </li>
      `;
    }

    const navItemClasses = ["nav-item", "has-submenu"];
    if (item.menuClass) {
      navItemClasses.push(item.menuClass);
    }

    return `
      <li class="${navItemClasses.join(" ")}">
        <a class="nav-link ${itemClass}" href="${root}${item.href}" aria-haspopup="true">${item.label}</a>
        <div class="nav-dropdown" role="menu" aria-label="${item.label} pages">
          ${item.children
            .map(
              (child) =>
                `<a class="nav-sub-link ${isChildActive(item.id, child) ? "is-active" : ""}" href="${root}${child.href}" role="menuitem">${child.label}</a>`
            )
            .join("")}
        </div>
      </li>
    `;
  };

  const mountHeader = () => {
    const headerMount = document.getElementById("site-header");
    if (!headerMount) {
      return;
    }

    headerMount.className = "site-header";
    headerMount.innerHTML = `
      <div class="container header-row">
        <a class="brand" href="${root}index.html" aria-label="AxisHR Home">
          <span class="brand-mark">AX</span>
          <span>AxisHR</span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="siteNav">Menu</button>
        <nav class="site-nav" id="siteNav" aria-label="Primary">
          <ul class="nav-list">
            ${navItems.map((item) => renderNavItem(item)).join("")}
          </ul>
        </nav>
        <a class="button button-primary header-cta" href="${root}book-demo.html">Book A Demo</a>
      </div>
    `;

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");
    if (!menuToggle || !siteNav) {
      return;
    }

    const isMobileViewport = () => window.innerWidth <= 1120;

    const setMenuOpen = (open) => {
      const shouldOpen = isMobileViewport() ? open : false;
      menuToggle.setAttribute("aria-expanded", String(shouldOpen));
      siteNav.classList.toggle("open", shouldOpen);
      siteNav.hidden = isMobileViewport() ? !shouldOpen : false;
      body.classList.toggle("menu-open", shouldOpen);
    };

    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!expanded);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1120) {
        setMenuOpen(false);
        return;
      }
      siteNav.hidden = !siteNav.classList.contains("open");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (!isMobileViewport() || !siteNav.classList.contains("open")) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (siteNav.contains(target) || menuToggle.contains(target)) {
        return;
      }

      setMenuOpen(false);
    });

    setMenuOpen(false);
  };

  const mountFooter = () => {
    const footerMount = document.getElementById("site-footer");
    if (!footerMount) {
      return;
    }

    footerMount.className = "site-footer";
    footerMount.innerHTML = `
      <div class="container footer-wrap">
        <div class="footer-col">
          <a class="brand" href="${root}index.html" aria-label="AxisHR Home">
            <span class="brand-mark">AX</span>
            <span>AxisHR</span>
          </a>
          <p>AxisHR helps growing teams run people operations with clarity across entities, branches, and borders.</p>
          <div class="tag-row">
            <span class="tag">People Ops</span>
            <span class="tag">Payroll</span>
            <span class="tag">Compliance</span>
          </div>
        </div>
        <div class="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="${root}why-axishr.html">Why AxisHR</a></li>
            <li><a href="${root}compare-axishr.html">Compare AxisHR</a></li>
            <li><a href="${root}industries.html">Industries</a></li>
            <li><a href="${root}pricing.html">Pricing</a></li>
            <li><a href="${root}about.html">About</a></li>
            <li><a href="${root}implementation.html">Implementation</a></li>
            <li><a href="${root}book-demo.html">Book A Demo</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Platform Features</h3>
          <ul>
            ${platformLinks.map((item) => `<li><a href="${root}${item.href}">${item.label}</a></li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; <span id="footerYear"></span> AxisHR. Built for teams scaling across branches, entities, and countries.</p>
      </div>
    `;

    const yearNode = document.getElementById("footerYear");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  };

  const initRegionalHero = () => {
    const regionalHero = document.querySelector("[data-regional-hero]");
    if (!regionalHero) {
      return;
    }

    const regionalLead = document.querySelector("[data-regional-lead]");
    const regionLabel = document.querySelector("[data-region-label]");
    const regionPrev = document.querySelector("[data-region-prev]");
    const regionNext = document.querySelector("[data-region-next]");

    const inferRegionByLocale = () => {
      const locale = (navigator.language || "").toUpperCase();
      const parts = locale.split("-");
      const regionCode = parts.length > 1 ? parts[1] : "";

      const bangladesh = new Set(["BD"]);
      const india = new Set(["IN"]);
      const usa = new Set(["US"]);
      const europe = new Set(["GB", "IE", "FR", "DE", "ES", "IT", "NL", "BE", "CH", "AT", "SE", "NO", "DK", "FI", "PL", "PT", "CZ", "GR", "RO", "HU"]);
      const middleEast = new Set(["AE", "SA", "QA", "KW", "OM", "BH", "JO", "LB", "IQ"]);

      if (bangladesh.has(regionCode)) return "bd";
      if (india.has(regionCode)) return "india";
      if (usa.has(regionCode)) return "usa";
      if (europe.has(regionCode)) return "eu";
      if (middleEast.has(regionCode)) return "middle-east";
      return "";
    };

    const inferRegionByTimeZone = () => {
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
      if (tz === "asia/dhaka") return "bd";
      if (tz === "asia/kolkata" || tz === "asia/calcutta") return "india";
      if (tz.startsWith("europe/")) return "eu";
      if (
        tz === "america/new_york" ||
        tz === "america/chicago" ||
        tz === "america/denver" ||
        tz === "america/los_angeles" ||
        tz === "america/phoenix" ||
        tz === "america/anchorage"
      ) {
        return "usa";
      }
      if (
        tz === "asia/dubai" ||
        tz === "asia/riyadh" ||
        tz === "asia/qatar" ||
        tz === "asia/kuwait" ||
        tz === "asia/bahrain" ||
        tz === "asia/muscat" ||
        tz === "asia/amman" ||
        tz === "asia/beirut"
      ) {
        return "middle-east";
      }
      return "";
    };

    const regions = [
      { key: "bd", label: "South Asia Policy", title: regionalHero.dataset.titleBd, lead: regionalLead?.dataset.leadBd || "" },
      { key: "india", label: "South Asia Scale", title: regionalHero.dataset.titleIndia, lead: regionalLead?.dataset.leadIndia || "" },
      { key: "eu", label: "Europe", title: regionalHero.dataset.titleEu, lead: regionalLead?.dataset.leadEu || "" },
      { key: "usa", label: "North America", title: regionalHero.dataset.titleUsa, lead: regionalLead?.dataset.leadUsa || "" },
      {
        key: "middle-east",
        label: "GCC & Middle East",
        title: regionalHero.dataset.titleMiddleEast,
        lead: regionalLead?.dataset.leadMiddleEast || ""
      },
      { key: "global", label: "Global", title: regionalHero.dataset.titleGlobal, lead: regionalLead?.dataset.leadGlobal || "" }
    ].filter((entry) => entry.title);

    if (!regions.length) {
      return;
    }

    const detectedRegion = inferRegionByLocale() || inferRegionByTimeZone() || "global";
    let currentIndex = regions.findIndex((entry) => entry.key === detectedRegion);
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const render = () => {
      const active = regions[currentIndex];
      regionalHero.textContent = active.title;
      if (regionalLead && active.lead) {
        regionalLead.textContent = active.lead;
      }
      if (regionLabel) {
        regionLabel.textContent = active.label;
      }
    };

    const shift = (delta) => {
      currentIndex = (currentIndex + delta + regions.length) % regions.length;
      render();
    };

    if (regionPrev) {
      regionPrev.addEventListener("click", () => shift(-1));
    }
    if (regionNext) {
      regionNext.addEventListener("click", () => shift(1));
    }

    render();
  };

  const initFeatureSlider = () => {
    const slider = document.querySelector("[data-feature-slider]");
    if (!slider) {
      return;
    }

    const slides = Array.from(slider.querySelectorAll("[data-slide]"));
    const prevButton = slider.querySelector("[data-slider-prev]");
    const nextButton = slider.querySelector("[data-slider-next]");
    const dotsMount = slider.querySelector("[data-slider-dots]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentIndex = 0;
    let autoplayTimer = null;
    const dots = [];

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const goTo = (index) => {
      if (!slides.length) {
        return;
      }

      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const active = i === currentIndex;
        slide.classList.toggle("is-active", active);
        slide.hidden = !active;
        slide.setAttribute("aria-hidden", String(!active));
      });

      dots.forEach((dot, i) => {
        const active = i === currentIndex;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
      });
    };

    const startAutoplay = () => {
      if (prefersReducedMotion || slides.length < 2 || autoplayTimer) {
        return;
      }
      autoplayTimer = setInterval(() => {
        goTo(currentIndex + 1);
      }, 7000);
    };

    if (dotsMount && slides.length > 1) {
      slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}: ${slide.dataset.label || "Feature"}`);
        dot.addEventListener("click", () => {
          goTo(index);
          stopAutoplay();
          startAutoplay();
        });
        dotsMount.appendChild(dot);
        dots.push(dot);
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        goTo(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        goTo(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
      });
    }

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
    slider.addEventListener("focusin", stopAutoplay);
    slider.addEventListener("focusout", (event) => {
      if (!slider.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    slider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goTo(currentIndex - 1);
      }
      if (event.key === "ArrowRight") {
        goTo(currentIndex + 1);
      }
    });

    goTo(0);
    startAutoplay();
  };

  const initCompareWidget = () => {
    const compareWidget = document.querySelector("[data-vs-single]");
    if (!compareWidget) {
      return;
    }

    const nameNode = compareWidget.querySelector("[data-vs-name]");
    const colNode = compareWidget.querySelector("[data-vs-col]");
    const bodyNode = compareWidget.querySelector("[data-vs-body]");
    const tabsNode = compareWidget.querySelector("[data-vs-tabs]");
    const prevNode = compareWidget.querySelector("[data-vs-prev]");
    const nextNode = compareWidget.querySelector("[data-vs-next]");
    const swipeTarget = compareWidget.querySelector(".comparison-wrap") || compareWidget;

    const competitors = [
      { key: "workday", name: "Workday" },
      { key: "sap", name: "SAP SuccessFactors" },
      { key: "bamboo", name: "BambooHR" },
      { key: "rippling", name: "Rippling" },
      { key: "adp", name: "ADP Workforce Now" }
    ];

    const rowsByCompetitor = {
      workday: [
        {
          axis: "Multi-entity and branch operations run in one workspace with role-scope boundaries.",
          right: "Designed for enterprise-wide HR transformation and global standardization."
        },
        {
          axis: "Branch transfers stay in one employee record with complete movement history.",
          right: "Complex organization behavior is usually shaped during larger implementation projects."
        },
        {
          axis: "Attendance, leave, and claims approvals are closed before payroll run start.",
          right: "Payroll is part of a broad enterprise suite and tied to wider program dependencies."
        },
        {
          axis: "Managers can approve operational requests without exposure to restricted salary fields.",
          right: "Strong governance controls are available for large-scale enterprise operations."
        },
        {
          axis: "Launch sequence starts with control and payroll readiness, then expands in phases.",
          right: "Rollouts commonly follow longer transformation timelines and formal program ownership."
        }
      ],
      sap: [
        {
          axis: "Branch-heavy operating groups stay aligned in one controlled workspace.",
          right: "Designed for global HR standardization across countries and regions."
        },
        {
          axis: "One employee profile carries branch assignment history across local transfers.",
          right: "Structure and localization depth are broad and depend on configuration strategy."
        },
        {
          axis: "Upstream approval controls reduce late payroll corrections before each run.",
          right: "Payroll and time sit inside a wide HR suite with regional setup requirements."
        },
        {
          axis: "Role scope and audit evidence are embedded in daily approvals and changes.",
          right: "Enterprise compliance controls span global HR operations."
        },
        {
          axis: "Rollout starts from high-risk workflows before broader process activation.",
          right: "Deployments are often program-led and multi-phase across regions."
        }
      ],
      bamboo: [
        {
          axis: "High-structure organizations get entity and branch control in one system.",
          right: "Strong fit for small and mid-sized teams that prioritize HR simplicity."
        },
        {
          axis: "Employee movement across branches stays traceable in one record.",
          right: "Centralized employee records are strongest in simpler organization models."
        },
        {
          axis: "Payroll preparation uses approved attendance, leave, and claim inputs.",
          right: "Payroll-connected workflows are optimized for straightforward SMB processes."
        },
        {
          axis: "Sensitive payroll data stays restricted while managers handle approvals.",
          right: "Configurable access controls with a usability-first administration model."
        },
        {
          axis: "Operational control comes first, then performance and analytics scale-up.",
          right: "Teams usually launch quickly when structure and policy complexity are lower."
        }
      ],
      rippling: [
        {
          axis: "HR operating control stays centered for multi-entity and branch-heavy groups.",
          right: "Strong fit when HR, IT, and finance automation are purchased together."
        },
        {
          axis: "Branch transfer history remains intact without cloning employee records.",
          right: "Centralized records pair with strong cross-system automation."
        },
        {
          axis: "Payroll quality improves by validating upstream approvals before run start.",
          right: "Payroll is integrated in a broader multi-domain automation stack."
        },
        {
          axis: "Role-scope boundaries and audit trails stay inside daily HR workflows.",
          right: "Policy and permission automation extends across connected business systems."
        },
        {
          axis: "Phased rollout protects payroll readiness before wider workflow expansion.",
          right: "Implementations often prioritize fast cross-system automation outcomes."
        }
      ],
      adp: [
        {
          axis: "Multi-branch and multi-entity operations stay unified in one controlled workspace.",
          right: "Strong fit for payroll and time-first operations in midsized organizations."
        },
        {
          axis: "Employee branch movement remains on one profile with full traceability.",
          right: "Centralized records align with a payroll and time-centered model."
        },
        {
          axis: "Payroll runs start from approved attendance, leave, and claim data.",
          right: "Payroll and time execution are core platform strengths."
        },
        {
          axis: "Managers can act on requests without seeing restricted salary information.",
          right: "Configurable controls span payroll, time, and HR workflows."
        },
        {
          axis: "Go-live focuses on control and payroll readiness, then expands by phase.",
          right: "Deployment commonly starts with payroll stabilization and broader HR expansion later."
        }
      ]
    };

    let activeIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const tabButtons = [];

    const render = () => {
      const active = competitors[activeIndex];
      const rows = rowsByCompetitor[active.key] || [];

      if (nameNode) {
        nameNode.textContent = active.name;
      }
      if (colNode) {
        colNode.textContent = active.name;
      }
      if (bodyNode) {
        bodyNode.innerHTML = rows
          .map(
            (row) => `
              <tr>
                <td class="axis-line">${row.axis}</td>
                <td>${row.right}</td>
              </tr>
            `
          )
          .join("");
      }

      tabButtons.forEach((button, index) => {
        const activeTab = index === activeIndex;
        button.classList.toggle("is-active", activeTab);
        button.setAttribute("aria-pressed", String(activeTab));
      });
    };

    const setActive = (index) => {
      activeIndex = (index + competitors.length) % competitors.length;
      render();
    };

    if (tabsNode) {
      competitors.forEach((competitor, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "vs-tab";
        button.textContent = competitor.name;
        button.setAttribute("aria-label", `Compare AxisHR vs ${competitor.name}`);
        button.addEventListener("click", () => setActive(index));
        tabsNode.appendChild(button);
        tabButtons.push(button);
      });
    }

    if (prevNode) {
      prevNode.addEventListener("click", () => setActive(activeIndex - 1));
    }
    if (nextNode) {
      nextNode.addEventListener("click", () => setActive(activeIndex + 1));
    }

    compareWidget.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        setActive(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        setActive(activeIndex + 1);
      }
    });

    swipeTarget.addEventListener(
      "touchstart",
      (event) => {
        if (!event.changedTouches.length) {
          return;
        }
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
      },
      { passive: true }
    );

    swipeTarget.addEventListener(
      "touchend",
      (event) => {
        if (!event.changedTouches.length) {
          return;
        }
        touchEndX = event.changedTouches[0].clientX;
        touchEndY = event.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX < 48 || absX <= absY) {
          return;
        }

        if (deltaX < 0) {
          setActive(activeIndex + 1);
        }
        if (deltaX > 0) {
          setActive(activeIndex - 1);
        }
      },
      { passive: true }
    );

    render();
  };

  const initDemoForm = () => {
    const form = document.querySelector("[data-demo-form]");
    if (!form) {
      return;
    }

    const preferredDate = form.querySelector("[data-demo-date]");
    const alternateDate = form.querySelector("[data-demo-date-alt]");
    const timeZoneSelect = form.querySelector("[data-time-zone]");

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const minDate = `${yyyy}-${mm}-${dd}`;

    if (preferredDate) {
      preferredDate.setAttribute("min", minDate);
    }

    if (alternateDate) {
      alternateDate.setAttribute("min", minDate);
    }

    if (preferredDate && alternateDate) {
      preferredDate.addEventListener("change", () => {
        const nextMin = preferredDate.value || minDate;
        alternateDate.setAttribute("min", nextMin);
        if (alternateDate.value && alternateDate.value < nextMin) {
          alternateDate.value = "";
        }
      });
    }

    if (timeZoneSelect) {
      const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (detectedTimeZone) {
        const matched = Array.from(timeZoneSelect.options).find((option) => option.value === detectedTimeZone);
        if (matched) {
          timeZoneSelect.value = matched.value;
        }
      }
    }
  };

  const initReveal = () => {
    const revealNodes = document.querySelectorAll("[data-reveal]");
    if (!revealNodes.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => {
        node.classList.add("reveal", "is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal", "is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((node) => {
      node.classList.add("reveal");
      io.observe(node);
    });
  };

  mountHeader();
  mountFooter();
  initRegionalHero();
  initFeatureSlider();
  initCompareWidget();
  initDemoForm();
  initReveal();
})();
