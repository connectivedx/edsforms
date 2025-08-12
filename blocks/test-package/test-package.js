import testPackageData from './_test-package.json';

export default function decorate(block) {
  const pkg = testPackageData;
  const markup = `
    <div class="test-package">
      <div class="test-summary">
        <div class="title-column">
          <div class="test-header">
            <span class="test-title">${pkg.title} ${pkg.regMark ? '<span class=\"reg-mark\">&reg;</span>' : ''}</span>
            <span class="test-description">${pkg.subtitle}</span>
          </div>
        </div>
        <div class="description-column">
          <span class="test-description">${pkg.summary}</span>
        </div>
        <button class="details-toggle"><span class="icon arrow-up"></span></button>
      </div>
      <div class="test-details">
        <div class="detail-column detail-info">
          <h3 class="detail-title">${pkg.detailsTitle}</h3>
          <p>${pkg.detailsDescription}</p>
          <p><strong>When to test:</strong> ${pkg.whenToTest}</p>
          <ul>
            ${pkg.features.map(f => `<li>&checkmark; ${f}</li>`).join('')}
          </ul>
          <div class="benefits-container">
            ${pkg.benefits.map(b => `
              <div class="package-benefit">
                <div class="icon">${b.icon}</div>
                <div class="benefit-description">${b.description}</div>
              </div>
            `).join('')}
          </div>
          <div class="sample-report">
            <span class="icon report"></span>${pkg.sampleReport}
          </div>
        </div>
        <div class="detail-column detail-options">
          <div class="requirement"><span class="required">*</span> Required information</div>
          <h3>Included</h3>
          <ul>
            ${pkg.included.map(i => `<li>&checkmark; ${i}</li>`).join('')}
          </ul>
          <form>
            <div>
              <h3>Pregnancy Type <span class="required">*</span></h3>
              ${pkg.form.pregnancyTypes.map(pt => `
                <span>
                  <input type="radio" id="${pt.id}" name="pregnancy-type" value="${pt.id}">
                  <label for="${pt.id}">${pt.label}</label>
                </span>
              `).join('')}
            </div>
            <div>
              <h3>Additions (optional)</h3>
              ${pkg.form.additions.map(add => `
                <div>
                  <input type="checkbox" id="${add.id}" name="additions" value="${add.id}">
                  <label for="${add.id}">${add.label} <span class="icon info">i</span></label>
                </div>
              `).join('')}
            </div>
          </form>
        </div>
      </div>
      <div class="order-buttons">
        <button class="button-add" type="button">Add to order</button>
        <button class="button-order" type="submit">Order now</button>
      </div>
    </div>
  `;
  block.innerHTML = markup;

  // Toggle details
  const toggleButton = block.querySelector('.details-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      block.querySelector('.test-package').classList.toggle('show');
    });
  }
}
