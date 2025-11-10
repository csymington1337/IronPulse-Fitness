//hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('#header .hamburger');
  const menu = document.querySelector('#header .nav-links ul');
  const menuLinks = document.querySelectorAll('#header .nav-links ul li a');
  const header = document.querySelector('#header .header-container');

  if (!hamburger || !menu) return;

  const isOpen = () => menu.classList.contains('active');

  function openMenu() {
    menu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    // return focus to trigger if closed via keyboard
    if (document.activeElement && !hamburger.contains(document.activeElement)) {
      hamburger.focus();
    }
  }

  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  //Click to open/close
  hamburger.addEventListener('click', toggleMenu);

  //Click a link -> close
  menuLinks.forEach(a => a.addEventListener('click', closeMenu));

  //Escape to close
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Header background on scroll
  document.addEventListener('scroll', () => {
    if (!header) return;
    header.style.backgroundColor = window.scrollY > 100 ? '#000' : 'transparent';
  });
});

//membership plan-type toggle
const toggleBtns = document.querySelectorAll('.toggle-btn[data-plan]');
const planSections = document.querySelectorAll('.plan-section');

if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            //Remove active from all plan buttons only
            toggleBtns.forEach(b => b.classList.remove('active'));
            //Add active to clicked button
            btn.classList.add('active');
            
            //Hide all plan sections
            planSections.forEach(section => section.classList.remove('active'));
            
            //Show corresponding plan section
            const planType = btn.dataset.plan;
            document.querySelector(`.${planType}-plans`).classList.add('active');
        });
    });
}

//membership CTA button animation
document.addEventListener('DOMContentLoaded', () => {
    const chevronBtn = document.querySelector('.chevron-btn');
    const plansCTA = document.querySelector('.plans-CTA, .training-CTA');

    if (chevronBtn && plansCTA) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chevronBtn.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(plansCTA);
    }
});

// Calorie Calculator
document.addEventListener('DOMContentLoaded', function() {
    let selectedSex = 'male';
    let selectedUnits = 'metric';

    // Sex toggle
    const sexToggles = document.querySelectorAll('[data-sex]');
    if (sexToggles.length > 0) {
        sexToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Only remove active from sex toggles
                sexToggles.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                selectedSex = this.dataset.sex;
            });
        });
    }

    // Units toggle
    const unitsToggles = document.querySelectorAll('[data-units]');
    if (unitsToggles.length > 0) {
        unitsToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Only remove active from units toggles
                unitsToggles.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                selectedUnits = this.dataset.units;
                updateUnitLabels();
            });
        });
    }

    // Update unit labels and show/hide height fields
    function updateUnitLabels() {
        const weightUnit = document.getElementById('weight-unit');
        const weightInput = document.getElementById('weight');
        const heightMetric = document.getElementById('height-metric');
        const heightImperial = document.getElementById('height-imperial');

        if (selectedUnits === 'metric') {
            weightUnit.textContent = 'kg';
            weightInput.placeholder = 'Enter your weight in kg';
            heightMetric.style.display = 'block';
            heightImperial.style.display = 'none';
        } else {
            weightUnit.textContent = 'lbs';
            weightInput.placeholder = 'Enter your weight in lbs';
            heightMetric.style.display = 'none';
            heightImperial.style.display = 'block';
        }
    }

    // Calculate button
    const calculateBtn = document.getElementById('calculate');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCalories);
    }

    function calculateCalories() {
        // Get input values
        const age = parseFloat(document.getElementById('age').value);
        let height;
        let weight = parseFloat(document.getElementById('weight').value);
        const activityLevel = parseFloat(document.getElementById('activity').value);

        // Get height based on units
        if (selectedUnits === 'metric') {
            height = parseFloat(document.getElementById('height-cm').value);
        } else {
            const feet = parseFloat(document.getElementById('height-feet').value) || 0;
            const inches = parseFloat(document.getElementById('height-inches').value) || 0;
            height = (feet * 12) + inches; // Total inches
        }

        // Validate inputs
        if (!age || !height || !weight || !activityLevel) {
            alert('Please fill in all fields');
            return;
        }

        if (age < 15 || age > 100) {
            alert('Please enter a valid age between 15 and 100');
            return;
        }

        // Convert imperial to metric if needed
        if (selectedUnits === 'imperial') {
            height = height * 2.54; // inches to cm
            weight = weight * 0.453592; // lbs to kg
        }

        // Calculate BMR based on sex
        let bmr;
        if (selectedSex === 'male') {
            bmr = (weight * 10) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (weight * 10) + (6.25 * height) - (5 * age) - 161;
        }

        // Calculate daily calorie needs
        const calories = bmr * activityLevel;

        // Display results
        document.getElementById('bmr').textContent = Math.round(bmr);
        document.getElementById('calories').textContent = Math.round(calories);
        document.getElementById('result').style.display = 'block';

        // Scroll to result
        document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});