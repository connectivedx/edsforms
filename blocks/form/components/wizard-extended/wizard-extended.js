// /blocks/form/components/wizard-extended/wizard-extended.js

import { WizardLayout as BaseWizardLayout } from '../wizard/wizard.js';

/**
 * Extended WizardLayout to show steps as radio buttons
 */
export class WizardExtendedLayout extends BaseWizardLayout {
  /**
   * Override menu creation with radio buttons
   */
  static createMenu(children) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'wizard-step-nav';
    const legend = document.createElement('legend');
    legend.textContent = 'Form Steps';
    fieldset.appendChild(legend);

    children.forEach((child, index) => {
      const label = document.createElement('label');
      label.className = 'wizard-step-option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'wizard-step';
      input.value = index;
      input.checked = index === 0;

      // Navigate to selected step
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          const panel = fieldset.closest('.wizard');
          const currentStep = panel.querySelector('.current-wizard-step');
          const targetStep = panel.querySelector(`.panel-wrapper:nth-of-type(${index + 1})`);

          if (currentStep !== targetStep) {
            currentStep.classList.remove('current-wizard-step');
            targetStep.classList.add('current-wizard-step');

            // Sync radios
            const radios = panel.querySelectorAll('input[name="wizard-step"]');
            radios.forEach((r, i) => r.checked = i === index);

            // Dispatch navigation event
            const event = new CustomEvent('wizard:navigate', {
              detail: {
                prevStep: { id: currentStep.id, index: +currentStep.dataset.index },
                currStep: { id: targetStep.id, index },
              },
              bubbles: false,
            });
            panel.dispatchEvent(event);
          }
        }
      });

      label.appendChild(input);
      label.appendChild(
        document.createTextNode(
          child.querySelector('legend')?.textContent || `Step ${index + 1}`
        )
      );

      fieldset.appendChild(label);
    });

    return fieldset;
  }

  /**
   * Override navigation to update radios
   */
  navigate(panel, forward = true) {
    super.navigate(panel, forward);

    // Sync radios
    const current = panel.querySelector('.current-wizard-step');
    const radios = panel.querySelectorAll('input[name="wizard-step"]');
    radios.forEach((radio, idx) => {
      radio.checked = idx === +current.dataset.index;
    });
  }
}

const layout = new WizardExtendedLayout();

export default function wizardExtendedLayout(panel) {
  layout.applyLayout(panel);
  return panel;
}

export const navigate = layout.navigate.bind(layout);
export const validateContainer = layout.validateContainer.bind(layout);
